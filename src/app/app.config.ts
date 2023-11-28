import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter, withViewTransitions } from '@angular/router';
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { routes } from './app.routes';

function initializeKeycloak(keycloak: KeycloakService) {

  return () => {

    if (typeof window !== 'undefined')
      return keycloak.init({
        config: {
          url: 'http://localhost:8080',
          realm: 'angular_dev',
          clientId: 'e_commerce'
        },
        initOptions: {
          // onLoad: 'check-sso',
          // silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
          onLoad: "login-required",
          checkLoginIframe: false,
          // redirectUri: 'https://www.google.com'
        }
      });
    return null
  }

}


export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(KeycloakAngularModule),
    provideRouter(
      routes,
      withViewTransitions(),
    ),
    provideClientHydration(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    },

  ]
};
