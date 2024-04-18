import re
import time
from unittest import result
from flask import Flask, json, render_template, request, jsonify
import os
from PyPDF2 import PdfReader
import pathlib
import textwrap
from threading import Thread
# from docx import Document
import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
import speech_recognition as sr

from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from gridfs import GridFS
import requests

app = Flask(__name__)
CORS(app)
CORS(app, origins=["http://localhost:4200"])

mongo_uri ='mongodb://localhost:27017/'
client = MongoClient(mongo_uri)
db=client['Avengers']
collection = db['Matching_results']
fs = GridFS(db)
 
genai.configure(api_key='AIzaSyCbc2Pv2sL4f5bhe3Cyb-k_FuD3x673qwA')

model = genai.GenerativeModel('models/gemini-1.0-pro-001')

def extract_text(file_path):
    _, file_extension = os.path.splitext(file_path)
    if file_extension.lower() == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_extension.lower() == '.docx':
        return extract_text_from_doc(file_path)
    else:
        return "Unsupported file format"

def extract_text_from_pdf(pdf_path):
    text = ""
    with open(pdf_path, 'rb') as file:
        reader = PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text

def extract_text_from_doc(docx_path):
    doc = Document(docx_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + '\n'
    return text

def preprocess_text(text):
    return text

def summarize_text_with_gemini(text, prompt):
    response = model.generate_content(f"{prompt}\n{text}")
    summary = response.parts[0].text
    return summary

def assess_alignment_with_gemini(res_summary, jd_summary, prompt):
    response = model.generate_content(f"{prompt}\nResume summary: {res_summary}\nJob description summary: {jd_summary}, Provide a matching score after comparing both the summaries . The format of the result should have a topic named Matching score,Matched skills,Non matched skills,Expertise Level,Overview,Final Conclusion by valaditing Matching score out of 100,Give OverView about matching and non matching skills , And if they are an experienced candidate give them an expertise level based on the analysis of their skills (Beginner, Intermediate, Advanced)")
    matching_score_analysis = response.parts[0].text
    return matching_score_analysis

# def mongodb(data):
#     try:
#         collection.insert_one(data)
#         return collection.inserted_id
#     except Exception as e:
#         print("Error",e)
#         return None
        
# def matching(question,actualanswer,answer):
#     response = model.generate_content(f"""validate the actual Question and answer with the answer given by Candidate,
#                                       Question:{question}\n,Actual Answer:{actualanswer},Response by Candidate{answer}.
#                                       Return the conceptual matching score in percentage of Actual answer with response by candidate 
#                                       in a json as "conceptual_matching_score" """)
#     matchpercentage = response.parts[0].text
#     return matchpercentage

def mongodb(data):
    try:
        result = collection.insert_one(data)
        print("Id", result)
        return result.inserted_id
    except Exception as e:
        print("Error:", e)
        return None

# def store_files_in_mongodb(resume_file, jd_file):
#     resume_file_id = fs.put(resume_file, filename=resume_file.filename)
#     jd_file_id = fs.put(jd_file, filename=jd_file.filename)
#     return {
#         'resume_file_id': resume_file_id,
#         'jd_file_id': jd_file_id
#     }



# @app.route('/')
# def index():
#     return render_template('index.html')

@app.route('/process', methods=['POST'])
def process_resume():
    if request.method == 'POST':
        resume_file = request.files['resume']
        jd_file = request.files['jd']
        uploads_dir = os.path.join(app.root_path, 'uploads')
        os.makedirs(uploads_dir, exist_ok=True)

        resume_path = os.path.join(uploads_dir, resume_file.filename)
        jd_path = os.path.join(uploads_dir, jd_file.filename)
        resume_file.save(resume_path)
        jd_file.save(jd_path)
        
        resume_text = extract_text(resume_path)
        jd_text = extract_text(jd_path)
        
        resume_text = preprocess_text(resume_text)
        jd_text = preprocess_text(jd_text)
        
        resume_prompt = "Create a summary of the provided resume text that highlights the Candidate Name, educational qualifications, technical skills, and experience in organizations of the candidate. Give a single paragraph summarizing the required fields so that it can be used to match a job description. Here is the text:"
        jd_prompt = "Give a detailed summary of the provided job description text that highlights the requirements for the specific position. Provide a single paragraph summary of the required skills for the job that can be matched with the candidate's resume summary. Here is the text:"
        match_prompt = """I have provided a job description and a resume summary. I need you to match the semantic context of both 
        the summaries highlighting the candidate's skills and Job description requirements. Keep a strict matching score such that if 
        the requirements match less than the score should be less.
        structure the JSON response with everything as follows:
            {
            "Given_Resume_Summary":"",
            "Given_Jd_Summary":"",
            "candidate_name": "",
            "position_applied_for": "",
            "matching_score": "",
            "matched_skills": [
                "",
                "",
            ],
            "non_matched_skills": [
                "",
                "",
                
            ],
            "expertise_level": "",
            "overview": "",
            "final_conclusion":""}
        
        """

        resume_summary = summarize_text_with_gemini(resume_text, resume_prompt)
        jd_summary = summarize_text_with_gemini(jd_text, jd_prompt)
        
        matching_score_analysis = assess_alignment_with_gemini(resume_summary, jd_summary, match_prompt)
        #muhil = matching_score_analysis.replace("**", "").replace("* ", "").replace("\n", "<br>")
        
        # print(muhil)
      
        
        json_data = json.loads(matching_score_analysis)
        candidate_name = json_data["candidate_name"]
        position_applied_for = json_data["position_applied_for"]
        matching_score = json_data["matching_score"]
        matched_skills = json_data["matched_skills"]
        non_matched_skills = json_data["non_matched_skills"]
        expertise_level = json_data["expertise_level"]
        overview = json_data["overview"]
        final_conclusion = json_data["final_conclusion"]
        
        mongodb({
        "matchingResults": matching_score_analysis
})
        
        # question = " What are the differences between C++ and Java?"
        # actual_answer = """C++ is not platform-independent; the principle behind C++ programming is “write once, compile anywhere.”
        #                 In contrast, because the byte code generated by the Java compiler is platform-independent, it can run on 
        #                 any machine, Java programs are written once and run everywhere"""
        # candidate_response ="""Java is a programming language used to develop application ,its compiler independent which has 
        # JVM so code can can be re used at multiple systems and i dont have idea on C++"""
        
        # qa_match_percentage = matching(question, actual_answer, candidate_response)
        # print(qa_match_percentage)

        return jsonify({
            'matchingResults': matching_score_analysis,
            # 'qaMatchPercentage': qa_match_percentage
        })

        
        # return jsonify({'matchingResults': matching_score_analysis})
        # return matching_score_analysis



def correct_prompt(topic,number_of_questions,experience_level):
    prompt = f"""
As an AI assistant specializing in technical interviews, I am tasked with generating interview questions for a software engineering role. The interview will focus on the following:

* **Skill:** {topic}
* **Number of Questions:** {number_of_questions}
* **Experience Level:** {experience_level}

Please generate a set of {number_of_questions} scenario-based and theoretical questions that assess the candidate's proficiency in {topic} at a {experience_level} level, focusing on theoretical understanding and problem-solving approaches. 

**For each question, provide the following:**

* **Question:** A clear and concise question that tests the candidate's theoretical knowledge and problem-solving skills in {topic}, without requiring code implementation.
* **Answer:** A detailed explanation of the expected answer, focusing on concepts, principles, and decision-making processes, rather than code syntax or specific libraries.

**Additional Considerations:**

* Ensure the questions cover a variety of theoretical topics within {topic} relevant to the {experience_level} level.
* Encourage critical thinking and problem-solving skills through scenario-based questions that can be tackled without coding.
* Maintain a clear and professional tone throughout the questions and answers.

**Example Output Format (JSON):**

```json
{{
  "topic": "skill",
  "questions": [
    {{
      "question_no": 1,
      "question": "[Question 1]",
      "answer": "[Answer 1]"
    }},
    {{
      "question_no": 2,
      "question": "[Question 2]",
      "answer": "[Answer 2]"
    }},
    ... (and so on for all number of questions)
  ]
}}

"""
    return prompt
  
def generate_questions(Topic,Experience,No_of_questions):
    oprompt=correct_prompt(Topic,No_of_questions,Experience)
    print(oprompt)
    response = model.generate_content(oprompt)
    interview_questions = response.text
    print(interview_questions)

    start_index = interview_questions.find('{')
    end_index = interview_questions.rfind('}') + 1
    json_str = interview_questions[start_index:end_index]
    #print("STR DATA IS #############*********************************************************")
   #print(json_str)

    #json_data = json.loads(json_str)
   # print("JSON DATA IS #############*********************************************************")

    #print(json_data)
   # json_string = json.dumps(json_data)

    return json_str


@app.route('/generate-interview-questions', methods=['GET'])
def getquestions(): 
    Topic = request.args.get('topic')
    Experience = request.args.get('experience')
    No_of_questions = request.args.get('no_of_questions')

    thread = Thread(target=generate_questions, args=(Topic, Experience, No_of_questions))
    thread.start()
    thread.join()
    return generate_questions(Topic, Experience, No_of_questions), 200





base_url = "https://api.assemblyai.com/v2"
api_key = "b80247ed3b5343c586ead1e879e21f08"

@app.route('/transcribe', methods=['POST'])
def transcribe_audio():
    headers = {
        "authorization": api_key
    }

    audio_file = request.files['audio']

    response = requests.post(
        base_url + "/upload",
        headers=headers,
        files={'file': audio_file}
    )

    upload_url = response.json()["upload_url"]
    data = {
        "audio_url": upload_url
    }
    url = base_url + "/transcript"
    response = requests.post(url, json=data, headers=headers)
    transcript_id = response.json()['id']
    polling_endpoint = f"https://api.assemblyai.com/v2/transcript/{transcript_id}"

    while True:
        transcription_result = requests.get(
            polling_endpoint,
            headers=headers
        ).json()

        if transcription_result['status'] == 'completed':
            return jsonify({"transcript": transcription_result['text']})

        elif transcription_result['status'] == 'error':
            return jsonify({"error": f"Transcription failed: {transcription_result['error']}"})

        else:
            time.sleep(3)

 
@app.route('/test1', methods=['POST'])
def test1():
    # if request.method == "POST":    
    #     req_Json = request.json
    #     name = req_Json['name']
    #     return jsonify({"response": "hi" + name})
 
 
 
    # Ensure that request contains audio file
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file provided'}), 400
   
    audio_file = request.files['audio']
   
    # Transcribe audio using SpeechRecognition
    recognizer = sr.Recognizer()
    with sr.AudioFile(audio_file) as source:
        audio_data = recognizer.record(source)
   
    try:
        transcript= recognizer.recognize_google(audio_data)
        
     
        return jsonify({'transcription': transcript}), 200
    except sr.UnknownValueError:
        return jsonify({'error': 'Could not transcribe audio'}), 500
    except sr.RequestError as e:
        return jsonify({'error': 'Error during transcription: ' + str(e)}), 500
 



if __name__ == '__main__':
    app.run(debug=True, threaded=True)
