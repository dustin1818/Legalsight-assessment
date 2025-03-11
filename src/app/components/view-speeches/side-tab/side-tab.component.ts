import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Speech } from '../../../interfaces/speech';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-side-tab',
  imports: [SharedModule],
  templateUrl: './side-tab.component.html',
  styleUrl: './side-tab.component.scss'
})
export class SideTabComponent {
  @Input() speeches: Speech[] = [];
  @Input() selectedSpeechId?: number;
  @Output() selectSpeech = new EventEmitter<Speech>();

  onSelectSpeech(speech: Speech) {
    this.selectSpeech.emit(speech);
  }
}