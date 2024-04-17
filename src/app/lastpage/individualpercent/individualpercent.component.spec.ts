import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualpercentComponent } from './individualpercent.component';

describe('IndividualpercentComponent', () => {
  let component: IndividualpercentComponent;
  let fixture: ComponentFixture<IndividualpercentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IndividualpercentComponent]
    });
    fixture = TestBed.createComponent(IndividualpercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
