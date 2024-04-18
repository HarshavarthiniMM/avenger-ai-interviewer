import { Component } from '@angular/core';

@Component({
  selector: 'app-gaugesecond',
  templateUrl: './gaugesecond.component.html',
  styleUrl: './gaugesecond.component.css'
})
export class GaugesecondComponent {
  thresholdConfig = {
    '0': {color: 'red'},
    '36': {color: 'orange'},
    '70': {color: 'green'}
};
  overallscore=60; //dynamic value received from backend of overall score
}
