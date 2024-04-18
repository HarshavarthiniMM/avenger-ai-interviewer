import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { AppService } from 'src/app/app.service';


@Component({
  selector: 'app-resumedescriptionupload',
  templateUrl: './resumedescriptionupload.component.html',
  styleUrl: './resumedescriptionupload.component.css'
})
export class ResumedescriptionuploadComponent implements OnInit{

  resume: File | null = null;
  jd: File | null = null;

  constructor(private appService: AppService, private router: Router) {}

  onFileSelected(event: any, type: string) {
    if (type === 'resume') {
      this.resume = event.target.files[0];
    } else if (type === 'jd') {
      this.jd = event.target.files[0];
    }
  }

  onSubmit() {
    this.loading = true;
    if (this.resume && this.jd) {
      // Send the files to the Flask app
      this.appService.processResume(this.resume, this.jd).subscribe({
        next: response => {
          console.log('Processing complete', response);
          // Navigate to the result page and pass the matching results
          this.router.navigate(['/skillmatch'])

        },
        error: error => {
          this.loading = false;
          console.error('HTTP error:', error);
          // Handle error (e.g., show error message to user)
        }
      });
    } else {
      this.loading = false;
      console.warn('No files selected');
    }
  }
  loading = false;

  

  ngOnInit(): void {
    this.router.events.subscribe(event => {
     if (event instanceof NavigationEnd) {
        // Navigation ended, hide loading circle
        this.loading = false;
      }
    });
  }
}
