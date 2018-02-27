import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieLawModule} from 'angular2-cookie-law';
import { TagInputModule } from 'ngx-chips';

import {MenuService} from './shared/services/menu.service';
import {ContentService} from './shared/services/content.service';
import { KeycloakService } from './shared/services/keycloak/keycloak.service';
import { JobServiceRegistrationService } from './shared/services/job-service-registration.service';

import {KeycloakGuard} from './shared/services/keycloak/keycloak.guard';

import {AppComponent} from './app.component';
import {NavbarComponent} from './layouts/navbar/navbar.component';
import {AssetsComponent} from './assets/assets.component';
import {PlatformComponent} from './platform/platform.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {NewsComponent} from './news/news.component';
import {ProfileComponent} from './account/profile/profile.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {FooterComponent} from './layouts/footer/footer.component';
import {PlatsbankenComponent} from './assets/platsbanken/platsbanken.component';
import {OccupationsComponent} from './assets/occupations/occupations.component';
import {HistoricalJobPostingsComponent} from './assets/historical-job-postings/historical-job-postings.component';
import {OccupationForecastsComponent} from './assets/occupation-forecasts/occupation-forecasts.component';
import {OntologyComponent} from './assets/ontology/ontology.component';
import {ProductMenuComponent} from './assets/product-menu/product-menu.component';
import { OverviewComponent } from './assets/overview/overview.component';
import { JobServiceListComponent } from './account/job-service-list/job-service-list.component';
import { JobServiceDetailsComponent } from './account/job-service-details/job-service-details.component';
import { JobServiceEditorComponent } from './account/job-service-editor/job-service-editor.component';

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
    OverviewComponent,
    JobServiceListComponent,
    JobServiceDetailsComponent,
    JobServiceEditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    CookieLawModule,
    ToastrModule.forRoot({positionClass: 'toast-top-full-width'}),
    TagInputModule
  ],
  providers: [
    KeycloakGuard,
    MenuService,
    ContentService,
    KeycloakService,
    JobServiceRegistrationService,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
