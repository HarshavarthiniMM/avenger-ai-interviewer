import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.css']
})
export class ButtonsComponent {
  selectCandidate() {
    // Add your logic for selecting a candidate here
    console.log('Candidate selected');
  }

  rejectCandidate() {
    // Add your logic for rejecting a candidate here
    console.log('Candidate rejected');
  }
}
