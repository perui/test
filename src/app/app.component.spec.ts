import {async, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {AppComponent} from './app.component';
import {AppModule} from './app.module';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import {NavbarComponent} from './layouts/navbar/navbar.component';
import {NgbDropdownModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';

import {CookieLawModule} from 'angular2-cookie-law';
import {FooterComponent} from './layouts/footer/footer.component';
import {ContentService} from './shared/services/content.service';

describe('AppComponent', () => {

  class MockUserService { }
  class MockKeycloakService { }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        NavbarComponent,
        FooterComponent
      ],
      imports: [
        CommonModule,
        RouterTestingModule,
        NgbDropdownModule.forRoot(),
        CookieLawModule,
        NgbModule,
        NoopAnimationsModule
      ],
      providers: [
        AppModule,
        ContentService
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

});

