import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSpeechesComponent } from './search-speeches.component';

describe('SearchSpeechesComponent', () => {
  let component: SearchSpeechesComponent;
  let fixture: ComponentFixture<SearchSpeechesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSpeechesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSpeechesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
