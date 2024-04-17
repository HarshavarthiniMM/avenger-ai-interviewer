import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllpercentageComponent } from './allpercentage.component';

describe('AllpercentageComponent', () => {
  let component: AllpercentageComponent;
  let fixture: ComponentFixture<AllpercentageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllpercentageComponent]
    });
    fixture = TestBed.createComponent(AllpercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
