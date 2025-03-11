import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, map, tap } from 'rxjs';
import { Speech } from '../interfaces/speech';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {
  apiUrl = 'speeches.json';
  protected speeches: Speech[] = [];

  constructor(private http: HttpClient) { }

  getSpeeches(): Observable<Speech[]> {
    if (this.speeches.length > 0) {
      return of(this.speeches);
    }

    return this.http.get<{ speeches: Speech[] }>(this.apiUrl).pipe(
      map(response => response.speeches),
      tap(speeches => this.speeches = speeches)
    );
  }

  addSpeech(speech: Speech): Observable<Speech> {
    return this.getSpeeches().pipe(
      map(() => {
        let highestId = 0;
        for (const speech of this.speeches) {
          if (typeof speech.id === 'number' && speech.id > highestId) {
            highestId = speech.id;
          }
        }

        const newId = highestId + 1;
        const newSpeech = {
          ...speech,
          id: newId
        };
        this.speeches.push(newSpeech);
        return newSpeech;
      })
    );
  }

  updateSpeech(speech: Speech): Observable<Speech> {
    const index = this.speeches.findIndex(s => s.id === speech.id);
    if (index !== -1) {
      this.speeches[index] = speech;
    }
    return of(speech);
  }

  deleteSpeech(id: string | number): Observable<void> {
    const index = this.speeches.findIndex(s => s.id === id);
    if (index !== -1) {
      this.speeches.splice(index, 1);
    }
    return of(void 0);
  }

  searchSpeeches(searchTerm: string): Observable<Speech[]> {
    return this.getSpeeches().pipe(
      map(speeches => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) {
          return speeches;
        }

        return speeches.filter(speech => {
          if (speech.author.toLowerCase().includes(term) ||
            speech.message.toLowerCase().includes(term) ||
            speech.keywords.toLowerCase().includes(term)) {
            return true;
          }

          const date = new Date(speech.date);
          const dateFormats = [
            date.toLocaleDateString(),
            date.toLocaleString('default', { month: 'long', day: 'numeric', year: 'numeric' }),
            date.toLocaleString('default', { month: 'short', day: 'numeric', year: 'numeric' })
          ].join(' ').toLowerCase();

          return dateFormats.includes(term);
        });
      })
    );
  }
}