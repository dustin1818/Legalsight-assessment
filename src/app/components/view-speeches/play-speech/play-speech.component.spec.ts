import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaySpeechComponent } from './play-speech.component';

describe('PlaySpeechComponent', () => {
  let component: PlaySpeechComponent;
  let fixture: ComponentFixture<PlaySpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlaySpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlaySpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
