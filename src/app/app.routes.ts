import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AssetsComponent } from './assets/assets.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewsComponent } from './news/news.component';
import { LogedinGuard } from './logedin.guard';
import { PlatformComponent } from './platform/platform.component'
import { ProfileComponent } from './profile/profile.component'
import { RegistrationComponent } from './registration/registration.component'
import { ShowcaseComponent } from './showcase/showcase.component'

export const router: Routes = [
    // { path: '', redirectTo: 'race-list', pathMatch: 'full' },
    { path: '', component: HomeComponent },
     { path: 'assets', component: AssetsComponent},
    { path: 'login', component: LoginComponent },
    { path: 'news', component: NewsComponent },
    { path: 'platform', component: PlatformComponent},
    { path: 'profile', component: ProfileComponent, canActivate: [LogedinGuard]},
    { path: 'registration', component: RegistrationComponent},
    { path: 'showcase', component: ShowcaseComponent },
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
