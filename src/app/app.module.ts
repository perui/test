import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieLawModule} from 'angular2-cookie-law';

import {MenuService} from './_services/menu.service';
import {ContentService} from './_services/content.service';
import {UserService} from './_services/user.service';

import {LogedinGuard} from './logedin.guard';

import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {AssetsComponent} from './assets/assets.component';
import {PlatformComponent} from './platform/platform.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {NewsComponent} from './news/news.component';
import {ProfileComponent} from './profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './footer/footer.component';
import {PlatsbankenComponent} from './assets/platsbanken/platsbanken.component';
import {OccupationsComponent} from './assets/occupations/occupations.component';
import {HistoricalJobPostingsComponent} from './assets/historical-job-postings/historical-job-postings.component';
import {OccupationForecastsComponent} from './assets/occupation-forecasts/occupation-forecasts.component';
import {OntologyComponent} from './assets/ontology/ontology.component';
import {ProductMenuComponent} from './assets/product-menu/product-menu.component';
import {LostPasswordComponent} from './auth/lost-password/lost-password.component';
import {SignInComponent} from './auth/sign-in/sign-in.component';
import {SignUpComponent} from './auth/sign-up/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AssetsComponent,
    PlatformComponent,
    ShowcaseComponent,
    NewsComponent,
    ProfileComponent,
    HomeComponent,
    FooterComponent,
    PlatsbankenComponent,
    OccupationsComponent,
    HistoricalJobPostingsComponent,
    OccupationForecastsComponent,
    OntologyComponent,
    ProductMenuComponent,
    LostPasswordComponent,
    SignInComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CookieLawModule,
    ToastrModule.forRoot({positionClass: 'toast-top-full-width'}),
  ],
  providers: [
    LogedinGuard,
    MenuService,
    ContentService,
    UserService,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
