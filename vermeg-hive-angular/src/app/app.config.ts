import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app-routing.module'; // Import the routes array from app.routes.ts

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)], // Use the imported routes array here
};
