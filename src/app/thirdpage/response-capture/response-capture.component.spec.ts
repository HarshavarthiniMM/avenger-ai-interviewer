import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseCaptureComponent } from './response-capture.component';

describe('ResponseCaptureComponent', () => {
  let component: ResponseCaptureComponent;
  let fixture: ComponentFixture<ResponseCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponseCaptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResponseCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
