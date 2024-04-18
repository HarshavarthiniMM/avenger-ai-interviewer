import { Component } from '@angular/core';

@Component({
  selector: 'app-angular-gauge',
  templateUrl: './angular-gauge.component.html',
  styleUrls: ['./angular-gauge.component.css']
})
export class AngularGaugeComponent {
  thresholdConfig = {
    '0': {color: 'red'},
    '36': {color: 'orange'},
    '70': {color: 'green'}
};
  overallscore=60; //dynamic value received from backend of overall score
}

