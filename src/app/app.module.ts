import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule }  from '@angular/router';
import { FormsModule, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { LogedinGuard } from './logedin.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { AssetsComponent } from './assets/assets.component';
import { PlatformComponent } from './platform/platform.component';
import { ShowcaseComponent } from './showcase/showcase.component';
import { NewsComponent } from './news/news.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AssetsComponent,
    PlatformComponent,
    ShowcaseComponent,
    NewsComponent,
    LoginComponent,
    RegistrationComponent,
    ProfileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routes,
  ],
  providers: [
    LogedinGuard,
  ],
  exports: [
    RouterModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
