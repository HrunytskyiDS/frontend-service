import { HttpInterceptorFn } from '@angular/common/http';

import { SERVICE_PREFIX_URL_MAP } from '@/shared/constants/api.constants';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  let requestUrl = req.url;

  for (const [prefix, url] of Object.entries(SERVICE_PREFIX_URL_MAP)) {
    if (requestUrl.startsWith(prefix)) {
      requestUrl = requestUrl.replace(prefix, url);
      break;
    }
  }

  req = req.clone({ url: requestUrl });

  return next(req);
};
