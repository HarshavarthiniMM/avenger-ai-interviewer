import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-skillmatch',
  templateUrl: './skillmatch.component.html',
  styleUrl: './skillmatch.component.css'
})
export class SkillmatchComponent implements OnInit{
  matchingResults: any;
  overallscore: number=0;

  thresholdConfig = {
    '0': { color: 'red' },
    '40': { color: 'orange' },
    '64': { color: 'green' }
  };

  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router) {}

  ngOnInit(): void {
    this.matchingResults = this.appService.response1;
    if (this.matchingResults && this.matchingResults.matchingResults) {
      this.overallscore = this.matchingResults.matchingResults.matching_score;
    }

    console.log('Overall score:', this.overallscore);
    console.log('Matching Results:', this.matchingResults);
  }
  toreponsecapture(){
    this.router.navigate(['/response-capture']);
  }
}
