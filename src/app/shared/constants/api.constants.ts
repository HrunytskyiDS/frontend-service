import { environment } from '@/environments/environment';

export const SERVICE_PREFIXES = {
  TEXT_ANALYSIS: '@text-analysis-service',
  TEXT_EXTRACTOR: '@text-extractor-service',
};

export const SERVICE_PREFIX_URL_MAP = {
  [SERVICE_PREFIXES.TEXT_ANALYSIS]: environment.textAnalysisServiceUrl,
  [SERVICE_PREFIXES.TEXT_EXTRACTOR]: environment.textExtractorServiceUrl,
};
