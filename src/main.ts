import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/app.module';
import {environment} from './environments/environment';

import {KeycloakService} from './app/shared/services/keycloak/keycloak.service';

if (environment.production) {
  enableProdMode();
}

if(environment.useKeycloak) {
  KeycloakService.init(environment.keycloak, {onLoad: 'check-sso'})
    .then(() => {
      platformBrowserDynamic().bootstrapModule(AppModule)
        .catch(err => console.error('Failed to start application, ', err));

    })
    .catch((e: any) => {
      console.error('Error in bootstrap: ' + JSON.stringify(e));
      throw e;
    });
} else {

  platformBrowserDynamic().bootstrapModule(AppModule)
}
