import { Component, OnInit } from '@angular/core';
import { Speech } from '../../interfaces/speech';
import { CustomToastService } from '../../services/custom-toast.service';
import { SpeechService } from '../../services/speech.service';
import { SharedModule } from '../../shared/shared.module';
import { PlaySpeechComponent } from './play-speech/play-speech.component';
import { SideTabComponent } from './side-tab/side-tab.component';

@Component({
  selector: 'app-view-speeches',
  imports: [SharedModule, PlaySpeechComponent, SideTabComponent],
  templateUrl: './view-speeches.component.html',
  styleUrl: './view-speeches.component.scss'
})

export class ViewSpeechesComponent implements OnInit {
  speeches: Speech[] = [];
  selectedSpeech?: Speech;
  editableSpeech?: Speech;

  constructor(
    private toast: CustomToastService,
    private speechService: SpeechService
  ) { }

  ngOnInit() {
    this.loadSpeeches();
  }

  get hasEmptySpeech() {
    return this.speeches.length == 0;
  }

  get hasEmptySelectedSpeech() {
    return !this.selectedSpeech;
  }

  loadSpeeches() {
    this.speechService.getSpeeches().subscribe({
      next: (speeches) => {
        this.speeches = speeches
      },
      error: (error) => {
        this.toast.error('Failed to load speeches');
      }
    });
  }

  onShowInfo() {
    this.toast.info('Please select the submit a new speech tab to start creating a new speech ✨');
  }


  onSelectSpeech(speech: Speech) {
    this.selectedSpeech = speech;
    this.editableSpeech = { ...speech };
  }

  onClickDelete() {
    if (this.selectedSpeech) {
      this.speechService.deleteSpeech(this.selectedSpeech.id).subscribe({
        next: () => {
          this.selectedSpeech = undefined;
          this.editableSpeech = undefined;

          const index = this.speeches.findIndex(s => s.id === this.selectedSpeech?.id);
          if (index !== -1) {
            this.speeches.splice(index, 1);
          }

          this.toast.success('Speech deleted successfully!');
        },
        error: (error) => {
          this.toast.error('Failed to delete speech');
        }
      });
    }
  }

  onClickSave() {
    if (this.selectedSpeech && this.editableSpeech) {
      this.speechService.updateSpeech(this.editableSpeech).subscribe({
        next: (updatedSpeech) => {
          this.selectedSpeech = { ...updatedSpeech };
          const index = this.speeches.findIndex(s => s.id === updatedSpeech.id);
          if (index !== -1) {
            this.speeches[index] = updatedSpeech;
          }

          this.toast.success('Changes saved successfully!');
        },
        error: (error) => {
          this.toast.error('Failed to save changes');
        }
      });
    }
  }

  onClickShare() {
    if (this.selectedSpeech) {
      const subject = `Shared via LegalSight Speech Platform - ${this.selectedSpeech.author}`;
      const body = `Speech by: ${this.selectedSpeech.author}
Date: ${new Date(this.selectedSpeech.date).toLocaleDateString()}
Keywords: ${this.selectedSpeech.keywords}
Message:
${this.selectedSpeech.message}`;
      const mailtoLink = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoLink, '_blank');
      this.toast.success('Opening email client to share speech');
    } else {
      this.toast.warning('Please select a speech to share');
    }
  }
}