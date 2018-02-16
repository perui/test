import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {ToastrModule } from 'ngx-toastr';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CookieLawModule} from 'angular2-cookie-law';

import {MenuService} from './shared/services/menu.service';
import {ContentService} from './shared/services/content.service';
import {UserService} from './shared/services/user.service';

import {LogedinGuard} from './shared/guards/logedin.guard';

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
import {ProductMenuComponent} from './assets/product-menu/product-menu.component';
import {LostPasswordComponent} from './account/lost-password/lost-password.component';
import {SignInComponent} from './account/sign-in/sign-in.component';
import {SignUpComponent} from './account/sign-up/sign-up.component';
import { DetailsComponent } from './assets/details/details.component';

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
    ProductMenuComponent,
    LostPasswordComponent,
    SignInComponent,
    SignUpComponent,
    DetailsComponent
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
