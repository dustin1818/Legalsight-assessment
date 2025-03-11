import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSpeechComponent } from './submit-speech.component';

describe('SubmitSpeechComponent', () => {
  let component: SubmitSpeechComponent;
  let fixture: ComponentFixture<SubmitSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubmitSpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubmitSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
