import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkillmatchComponent } from './skillmatch.component';

describe('SkillmatchComponent', () => {
  let component: SkillmatchComponent;
  let fixture: ComponentFixture<SkillmatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillmatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkillmatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
