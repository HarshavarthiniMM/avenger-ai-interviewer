import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumedescriptionuploadComponent } from './resumedescriptionupload.component';

describe('ResumedescriptionuploadComponent', () => {
  let component: ResumedescriptionuploadComponent;
  let fixture: ComponentFixture<ResumedescriptionuploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResumedescriptionuploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ResumedescriptionuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
