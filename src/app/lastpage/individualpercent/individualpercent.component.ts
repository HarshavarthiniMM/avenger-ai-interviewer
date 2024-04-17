import { Component } from '@angular/core';

@Component({
  selector: 'app-individualpercent',
  templateUrl: './individualpercent.component.html',
  styleUrls: ['./individualpercent.component.css']
})
export class IndividualpercentComponent {
  progressValue1: number = 80; /* Percentage of score in first skill set*/
  progressValue2: number = 70; /* Percentage of score in second skill set*/
  progressValue3: number = 90; /* Percentage of score in third skill set*/
  progressValue4: number = 50; /* Percentage of score in fourth skill set*/
  progressValue5: number = 44; /* Percentage of score in fifth skill set*/
}
