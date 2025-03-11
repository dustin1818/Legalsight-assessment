import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Speech } from '../../../interfaces/speech';
import { SharedModule } from '../../../shared/shared.module';
import { CustomToastService } from '../../../services/custom-toast.service';

@Component({
  selector: 'app-play-speech',
  imports: [SharedModule],
  templateUrl: './play-speech.component.html',
  styleUrl: './play-speech.component.scss'
})
export class PlaySpeechComponent implements OnChanges, OnDestroy {
  @Input() speech?: Speech;

  isPlaying = false;
  isPaused = false;
  speechSynthesis: SpeechSynthesis;
  speechUtterance?: SpeechSynthesisUtterance;

  constructor(private toast: CustomToastService) {
    this.speechSynthesis = window.speechSynthesis;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['speech']) {
      this.stopAudio();
    }
  }

  playAudio() {
    if (!this.speech) {
      this.toast.warning('No speech available to play');
      return;
    }

    if (this.isPlaying) {
      this.pauseAudio();
      return;
    }

    if (this.isPaused && this.speechUtterance) {
      try {
        this.speechSynthesis.resume();
        this.isPlaying = true;
        this.isPaused = false;
        this.toast.info('Resuming speech audio');
        return;
      } catch (error) {
        console.error('Error resuming speech:', error);
        this.stopAudio();
      }
    }

    this.speechUtterance = new SpeechSynthesisUtterance(this.speech.message);

    this.speechUtterance.rate = 1.0;
    this.speechUtterance.pitch = 1.0;

    // Event handlers
    this.speechUtterance.onend = () => {
      this.isPlaying = false;
      this.isPaused = false;
    };

    this.speechUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      this.isPlaying = false;
      this.isPaused = false;
      this.toast.error('Error playing speech audio');
    };

    try {
      this.speechSynthesis.cancel(); // Clear any previous instances
      this.speechSynthesis.speak(this.speechUtterance);
      this.isPlaying = true;
      this.isPaused = false;
      this.toast.info('Playing speech audio');
    } catch (error) {
      console.error('Error starting speech:', error);
      this.toast.error('Failed to start speech playback');
    }
  }

  pauseAudio() {
    if (this.isPlaying) {
      try {
        this.speechSynthesis.pause();
        this.isPlaying = false;
        this.isPaused = true;
        this.toast.info('Paused speech audio');
      } catch (error) {
        console.error('Error pausing speech:', error);
        this.stopAudio();
        this.toast.error('Error pausing speech, playback stopped');
      }
    }
  }

  stopAudio() {
    try {
      this.speechSynthesis.cancel();
      this.isPlaying = false;
      this.isPaused = false;
    } catch (error) {
      console.error('Error stopping speech:', error);
    }
  }

  ngOnDestroy() {
    this.stopAudio();
  }
}