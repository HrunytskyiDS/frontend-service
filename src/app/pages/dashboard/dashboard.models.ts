import {
  ApexAxisChartSeries,
  ApexChart,
  ApexFill,
  ApexMarkers,
  ApexNoData,
  ApexTitleSubtitle,
  ApexXAxis,
  ApexYAxis,
} from 'ng-apexcharts';

interface BaseChartOptions {
  chart: ApexChart;
  title: ApexTitleSubtitle;
  series: ApexAxisChartSeries;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  noData: ApexNoData;
}

export interface KeywordCountChartOptions extends BaseChartOptions {}

export interface DiversityPerformanceChartOptions extends BaseChartOptions {
  fill: ApexFill;
  markers: ApexMarkers;
}

export interface AnalysisDurationChartOptions extends BaseChartOptions {}

export interface KeywordCountStats {
  n_user: number;
  n_semantic_recommended: number;
  n_final: number;
}

export interface DiversityPerformanceStats {
  diversity: number;
  avg_keybert_ms: number;
  avg_llm_ms: number;
}

export interface StatsResponse {
  keyword_count: KeywordCountStats[];
  diversity_performance: DiversityPerformanceStats[];
  analysis_duration: number[];
}
