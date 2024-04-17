import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnswerEvaluationComponent } from './answer-evaluation.component';

describe('AnswerEvaluationComponent', () => {
  let component: AnswerEvaluationComponent;
  let fixture: ComponentFixture<AnswerEvaluationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnswerEvaluationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnswerEvaluationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
