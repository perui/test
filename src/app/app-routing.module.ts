import {RouterModule, Routes} from '@angular/router';
import {AssetsComponent} from './assets/assets.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {LogedinGuard} from './logedin.guard';
import {PlatformComponent} from './platform/platform.component';
import {ProfileComponent} from './profile/profile.component';
import {RegistrationComponent} from './registration/registration.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PlatsbankenComponent} from './assets/platsbanken/platsbanken.component';
import {OntologyComponent} from './assets/ontology/ontology.component';
import {OccupationForecastsComponent} from './assets/occupation-forecasts/occupation-forecasts.component';
import {OccupationsComponent} from './assets/occupations/occupations.component';
import {HistoricalJobPostingsComponent} from './assets/historical-job-postings/historical-job-postings.component';

const routes: Routes = [
  // { path: '', redirectTo: 'race-list', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'assets/platsbanken', component: PlatsbankenComponent},
  {path: 'assets/occupation-forecasts', component: OccupationForecastsComponent},
  {path: 'assets/occupations', component: OccupationsComponent},
  {path: 'assets/historical-job-postings', component: HistoricalJobPostingsComponent},
  {path: 'assets/ontology', component: OntologyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'news', component: NewsComponent},
  {path: 'platform', component: PlatformComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LogedinGuard]},
  {path: 'registration', component: RegistrationComponent},
  {path: 'showcase', component: ShowcaseComponent},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
