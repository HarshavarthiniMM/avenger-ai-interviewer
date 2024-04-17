import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-response-capture',
  templateUrl: './response-capture.component.html',
  styleUrl: './response-capture.component.css'
})
export class ResponseCaptureComponent implements OnInit{
  showExplanation: boolean= false;
  isRecording: boolean = false;
  isPaused: boolean = false;
  recordedAudioBlob: Blob | null = null;
  recordedAudioUrl: string | null = null;
  transcriptionResponse: JSON | null = null;
  str : string | null = null;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  mediaRecorder!: MediaRecorder;
  recordedChunks: Blob[] = [];

  @Input() topics: string[]= ["MYSQL","PYTHON","JAVA","NETWORKING"];
  selectedTopic: string ="";
  responses: { topic: string, questions: { question_no: number, question: string, answer: string ,candidateAnswer : string, showAnswer : boolean}[], loading: boolean  }[] = [];

  constructor(private apiService: AppService,  private cd: ChangeDetectorRef) {


    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
      this.mediaRecorder = new MediaRecorder(stream);
      this.mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          this.recordedChunks.push(event.data);
        }
      };
    })
    .catch(error => {
      console.error('Error accessing media devices:', error);
    });

  }

  ngOnInit() { 
    
  this.topics.forEach((topic, index) => {
    setTimeout(() => {
      this.fetchData(topic);
    }, 2 * (index + 1)); // Delay each call by the constant delay value
  });
  this.handleRecordedAudio;
  
  }
  // fetchData(topic: string) {
  //   const index = this.responses.findIndex(item => item.topic === topic);
  //   if (index === -1) {
  //     this.responses.push({ topic, questions: [], loading: true });
  //     this.apiService.getQuestions(topic).subscribe(response => {
  //       const idx = this.responses.findIndex(item => item.topic === topic);
  //       this.responses[idx].questions = response.questions;
  //       this.responses[idx].loading = false;
  //     });
  //   }
  // }
  
  toggleExplanation( topic :string,question_no :number ) {


    const finalResponseIndex = this.responses.findIndex(response =>
      response.topic === topic &&
      response.questions.some(question =>
        question.question_no === question_no
      )
    );


    if (finalResponseIndex !== -1) {
      // Find the index of the question within the finalResponse
      const questionIndex = this.responses[finalResponseIndex].questions.findIndex(question =>
        question.question_no === question_no
      );
    
      if (questionIndex !== -1) {
        // Update the showAnswer value of the question
        this.responses[finalResponseIndex].questions[questionIndex].showAnswer =  !this.responses[finalResponseIndex].questions[questionIndex].showAnswer ;
      } 
    } 


  }

  fetchData(topic: string) {
    const index = this.responses.findIndex(item => item.topic === topic);
    if (index === -1) {
      this.responses.push({ topic, questions: [], loading: true });
      this.fetchQuestions(topic);
    }
  }
  
  fetchQuestions(topic: string) {
    this.apiService.getQuestions(topic).subscribe(
      response => {
        const idx = this.responses.findIndex(item => item.topic === topic);
        this.responses[idx].questions = response.questions;
        this.responses[idx].loading = false;
      },
      error => {
        console.error('Error fetching questions:', error);
        // Retry the API call after a delay
        setTimeout(() => {
          this.fetchQuestions(topic);
        }, 1000); // Retry after 1 second, you can adjust the delay as needed
      }
    );
  }
  
  onContentChange(event: Event,topic :string,question_no :number) {

    console.log("ok")
//     const target = event.target as HTMLElement;
//     const content = target.innerText;
//    // target.innerHTML="";
// console.log("topic is" + topic)
// console.log("question_no is" + question_no)


// console.log("content is" + content)
//     const finalResponseIndex = this.responses.findIndex(response =>
//       response.topic === topic &&
//       response.questions.some(question =>
//         question.question_no === question_no
//       )
//     );

//     if (finalResponseIndex !== -1) {
//       const questionIndex = this.responses[finalResponseIndex].questions.findIndex(question =>
//         question.question_no === question_no
//       );
    
//       if (questionIndex !== -1) {
//        // this.responses[finalResponseIndex].questions[questionIndex].candidateAnswer ="";
//        //target.innerHTML="";
//         this.responses[finalResponseIndex].questions[questionIndex].candidateAnswer =  content;
//     console.log(questionIndex)

//       } 
//     } 
// console.log(this.responses)

  }


  // selectTopic(topic: string) {
  //   this.selectedTopic = topic;
  //   const selectedResponse = this.responses.find(item => item.topic === topic);
  //   this.fetchData(topic);
  // }


  selectTopic(topic: string) {
    this.selectedTopic = topic;
    this.fetchData(topic);
  }
 


  toggleRecording() {
    if (this.isRecording) {
      this.stopRecording();
    } else {
      this.startRecording();
    }
  }

  // startRecording() {
  //   console.log("Recording clickked");
    

  //   if (this.mediaRecorder && this.mediaRecorder.state === 'inactive') {
  //     this.recordedChunks = [];
  //     this.mediaRecorder.start();
  //     this.isRecording = true;
  //     this.isPaused = false;
  //     console.log("Recording started");
  //         }
  // }

  pauseRecording() {
    console.log(this.isRecording);

    if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
      this.mediaRecorder.pause();
      this.isPaused = true;

      console.log("Recording paused");
          }
  }

  resumeRecording() {
    console.log("resumeRecording clickked");
    if (this.mediaRecorder && this.mediaRecorder.state === 'paused') {
      this.mediaRecorder.resume();
      this.isPaused = false;

      console.log("Recording resumed");
      console.log( "isRecording state is " + this.isRecording);
      console.log( "isPaused state is " + this.isPaused);
      console.log( "mediaRecorder state is " +this.mediaRecorder.state);

      
    }
  }

  // stopRecording() {
  //   console.log("stopRecording clickked");

  //   if (this.mediaRecorder && (this.mediaRecorder.state === 'recording' || this.mediaRecorder.state === 'paused')) {
  //     this.mediaRecorder.stop();
  //     this.isRecording = false;
  //     console.log("Recording stopped");
  //     console.log( "isRecording state is " + this.isRecording);
  //     console.log( "isPaused state is " + this.isPaused);
  //     console.log( "mediaRecorder state is " +this.mediaRecorder.state);
  //   }
  // }


  // saveRecording() {
  //   console.log("saveRecording");

  //   if (this.recordedChunks.length > 0) {
  //     const blob = new Blob(this.recordedChunks, { type: 'audio/wav' });
  //     const url = URL.createObjectURL(blob);
  //     const a = document.createElement('a');
  //     document.body.appendChild(a);
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = 'recorded_audio.wav';
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //     console.log("Recording saved");
  //   }
  // }


  // playRecording() {
  //   if (this.recordedChunks.length > 0) {
  //     const blob = new Blob(this.recordedChunks, { type: 'audio/wav' });
  //     const url = URL.createObjectURL(blob);
  //     const audio = document.getElementById('recordedAudio') as HTMLAudioElement;
  //     audio.src = url;
  //     audio.play();
  //   }
  // }


  startRecording() {
    this.isRecording = true;
    this.apiService.startRecording();
  }

  stopRecording() {
    this.isRecording = false;
    this.apiService.stopRecording();
  }
  playRecordedAudio() {
    if (this.recordedAudioBlob) {
      const audioUrl = window.URL.createObjectURL(this.recordedAudioBlob);
      this.audioPlayer.nativeElement.src = audioUrl;
      this.audioPlayer.nativeElement.play();
    } else {
      console.error("No recorded audio available.");
    }
  }

  transcribeAudio(audioBlob: Blob) {
    // Convert Blob to File
    const audioFile = new File([audioBlob], 'recorded_audio.wav');
    
    // Log the audio file data
    console.log('Audio file:', audioFile);

    this.apiService.transcribeAudio(audioFile)
      .then(transcript => {
        this.transcriptionResponse = transcript; 
        console.log('Transcription:', this.transcriptionResponse);// Store the transcription response
        this.str= JSON.stringify(this.transcriptionResponse );
      })
      .catch(error => {
        console.error('Error transcribing audio:', error);
      });

}

handleRecordedAudio(blob: Blob) {
  this.recordedAudioBlob = blob;
  this.recordedAudioUrl = window.URL.createObjectURL(blob);
  this.audioPlayer.nativeElement.src = this.recordedAudioUrl;
  this.cd.detectChanges();

  if (this.recordedAudioBlob) {
    // Do something with the recorded audio blob
    console.log("Recorded audio blob:", this.recordedAudioBlob);
    this.transcribeAudio(this.recordedAudioBlob);

  } else {
    console.error("No recorded audio available.");
  }
  //this.playRecordedAudio();
}
}
