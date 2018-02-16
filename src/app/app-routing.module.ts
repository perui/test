import {RouterModule, Routes} from '@angular/router';
import {AssetsComponent} from './assets/assets.component';
import {DetailsComponent} from './assets/details/details.component';
import {SignInComponent} from './account/sign-in/sign-in.component';
import {SignUpComponent} from './account/sign-up/sign-up.component';
import {LostPasswordComponent} from './account/lost-password/lost-password.component';
import {HomeComponent} from './home/home.component';
import {NewsComponent} from './news/news.component';
import {LogedinGuard} from './shared/guards/logedin.guard';
import {PlatformComponent} from './platform/platform.component';
import {ProfileComponent} from './account/profile/profile.component';
import {ShowcaseComponent} from './showcase/showcase.component';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';


const routes: Routes = [
  // { path: '', redirectTo: 'race-list', pathMatch: 'full' },
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'assets', component: AssetsComponent},
  {path: 'assets/:id', component: DetailsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'platform', component: PlatformComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [LogedinGuard]},
  {path: 'signin', component: SignInComponent},
  {path: 'signup', component: SignUpComponent},
  {path: 'lost-password', component: LostPasswordComponent},
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
