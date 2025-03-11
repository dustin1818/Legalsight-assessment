import { Routes } from '@angular/router';
import { ViewSpeechesComponent } from './components/view-speeches/view-speeches.component';
import { SubmitSpeechComponent } from './components/submit-speech/submit-speech.component';
import { SearchSpeechesComponent } from './components/search-speeches/search-speeches.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { MainPageComponent } from './components/main-page/main-page.component';

export const routes: Routes = [
    { path: '', component: LandingPageComponent },
    {
        path: 'main',
        component: MainPageComponent,
        children: [
            { path: 'view-speeches', component: ViewSpeechesComponent },
            { path: 'submit-speech', component: SubmitSpeechComponent },
            { path: 'search-speeches', component: SearchSpeechesComponent },
            { path: '', redirectTo: 'view-speeches', pathMatch: 'full' }
        ]
    },
    { path: '**', redirectTo: '' }
];