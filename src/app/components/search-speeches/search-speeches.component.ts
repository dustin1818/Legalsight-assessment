import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Speech } from '../../interfaces/speech';
import { SpeechService } from '../../services/speech.service';
import { SharedModule } from '../../shared/shared.module';
import { CustomToastService } from '../../services/custom-toast.service';

@Component({
  selector: 'app-search-speeches',
  templateUrl: './search-speeches.component.html',
  styleUrls: ['./search-speeches.component.scss'],
  imports: [SharedModule],
})
export class SearchSpeechesComponent implements OnInit {
  searchControl = new FormControl('');
  speeches: Speech[] = [];
  isLoading = false;

  constructor(
    private speechService: SpeechService,
    private toast: CustomToastService
  ) {
    this.setupSearch();
  }

  ngOnInit() {
    this.speechService.getSpeeches().subscribe({
      next: (speeches) => {
        this.speeches = speeches;
      },
      error: (error) => {
        this.toast.error('Failed to load speeches');
      }
    });
  }

  private setupSearch() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(term => {
        this.isLoading = true;
        return this.speechService.searchSpeeches(term || '');
      })
    ).subscribe({
      next: (results) => {
        this.speeches = results;
        this.isLoading = false;
      },
      error: (error) => {
        this.isLoading = false;
        this.toast.error('Error searching speeches');
      }
    });
  }
}