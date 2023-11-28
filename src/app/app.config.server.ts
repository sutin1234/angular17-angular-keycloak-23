import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { provideISR } from '@rx-angular/isr/server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(),
    provideISR()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
