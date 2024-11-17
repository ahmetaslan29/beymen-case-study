import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    importProvidersFrom(NgxDaterangepickerMd.forRoot()),
  ]
};
