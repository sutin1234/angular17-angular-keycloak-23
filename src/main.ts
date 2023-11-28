import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

declare var window: any

bootstrapApplication(AppComponent, appConfig).then(ref => {
  // if (window['ngRef']) {
  //   window['ngRef'].destroy();
  // }
  // window['ngRef'] = ref;
}).catch((err) => console.error(err));
