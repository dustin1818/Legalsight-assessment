import { Component } from '@angular/core';
import { Speech } from '../../interfaces/speech';
import { SpeechService } from '../../services/speech.service';
import { CustomToastService } from '../../services/custom-toast.service';
import { SharedModule } from '../../shared/shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-submit-speech',
  templateUrl: './submit-speech.component.html',
  styleUrls: ['./submit-speech.component.scss'],
  imports: [SharedModule],
})
export class SubmitSpeechComponent {
  speechForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toast: CustomToastService,
    private speechService: SpeechService
  ) {
    this.speechForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      keyword: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  onSubmit() {
    if (this.speechForm.valid) {
      const newSpeech: Speech = {
        id: 0,
        author: this.speechForm.value.author,
        message: this.speechForm.value.content,
        keywords: this.speechForm.value.keyword,
        date: new Date().toISOString()
      };

      this.speechService.addSpeech(newSpeech).subscribe({
        next: () => {
          this.toast.success('Speech submitted successfully!');
          this.speechForm.reset();
        },
        error: (error) => {
          this.toast.error('Failed to submit speech');
        }
      });
    } else {
      this.toast.error('Please fill all required fields correctly.');
    }
  }
}