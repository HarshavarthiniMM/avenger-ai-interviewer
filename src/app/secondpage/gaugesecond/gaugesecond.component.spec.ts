import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaugesecondComponent } from './gaugesecond.component';

describe('GaugesecondComponent', () => {
  let component: GaugesecondComponent;
  let fixture: ComponentFixture<GaugesecondComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaugesecondComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GaugesecondComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
