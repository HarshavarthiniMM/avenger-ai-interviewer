import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { bufferToWave } from './thirdpage/audio-helper';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private apiUrl = 'http://localhost:5000/process'; // Flask server endpoint
  response1 : any;
  constructor(private http: HttpClient) {}

  processResume(resumeFile: File, jdFile: File): Observable<any> {
    const formData = new FormData();
    formData.append('resume', resumeFile);
    formData.append('jd', jdFile);

    return this.http.post<any>(this.apiUrl, formData)
      .pipe(
        map(response => {
          // Parse the matchingResults JSON string to an object
          response.matchingResults = JSON.parse(response.matchingResults);
          this.response1 = response;
          return response;
        
        })
      );
  }
  QA_API='http://127.0.0.1:5000/generate-interview-questions'

  getQuestions( topic : string){
   let params = new HttpParams()
   .set('topic', topic)
   .set('no_of_questions','10')
   .set('experience', 'Intermediate');
   return this.http.get<any>(`${this.QA_API}` , { params: params })
  }

  getTopics(){
   return this.http.get<any[]>("http://127.0.0.1:5000/get-topics")
 }

 private chunks: any[] = [];
  private mediaRecorder: any;
  private audioContext: AudioContext = new AudioContext();
  private audioBlobSubject = new Subject<Blob>();

  audioBlob$ = this.audioBlobSubject.asObservable();
 
 async startRecording() {
  if (this.audioContext.state === 'suspended') {
    await this.audioContext.resume();
  }
  
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  this.mediaRecorder = new MediaRecorder(stream);
  this.mediaRecorder.ondataavailable = (event: any) => this.chunks.push(event.data);
  this.mediaRecorder.start();
}

async stopRecording() {
  if (this.mediaRecorder) {
    this.mediaRecorder.onstop = async () => {
      const audioData = await new Blob(this.chunks).arrayBuffer();
      const audioBuffer = await this.audioContext.decodeAudioData(audioData);
      const wavBlob = bufferToWave(audioBuffer, audioBuffer.length);
      this.audioBlobSubject.next(wavBlob);
      this.chunks = [];
    };

    this.mediaRecorder.stop();
  }
}
 transcribeAudio(audioFile: File): Promise<any> {
  const formData = new FormData();
  formData.append('audio', audioFile);

  return this.http.post<any>('http://localhost:5000/test1', formData)
    .toPromise()
    .then(response => {
      return response;
    })
    .catch(error => {
      console.error('Error transcribing audio:', error);
      throw error;
    });
}
}
