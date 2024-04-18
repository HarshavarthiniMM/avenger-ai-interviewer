import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularGaugeComponent } from './angular-gauge.component';

describe('AngularGaugeComponent', () => {
  let component: AngularGaugeComponent;
  let fixture: ComponentFixture<AngularGaugeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularGaugeComponent]
    });
    fixture = TestBed.createComponent(AngularGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
