import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import uk from '@angular/common/locales/uk';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideNzI18n, uk_UA } from 'ng-zorro-antd/i18n';

import { routes } from '@/app.routes';
import { baseUrlInterceptor } from '@/shared/interceptors/base-url.interceptor';
import { cacheInterceptor } from '@/shared/interceptors/cache.interceptor';

registerLocaleData(uk);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withComponentInputBinding()),
    provideNzI18n(uk_UA),
    provideAnimationsAsync(),
    provideHttpClient(withInterceptors([cacheInterceptor, baseUrlInterceptor])),
  ],
};
