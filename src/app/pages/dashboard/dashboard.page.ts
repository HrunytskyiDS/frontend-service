import { Component, DestroyRef, OnInit, inject } from '@angular/core';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

import {
  AnalysisDurationChartOptions,
  DiversityPerformanceChartOptions,
  DiversityPerformanceStats,
  KeywordCountChartOptions,
  KeywordCountStats,
  StatsResponse,
} from '@/pages/dashboard/dashboard.models';
import { DashboardService } from '@/pages/dashboard/dashboard.service';

@Component({
  selector: 'app-dashboard',
  imports: [ChartComponent, NgApexchartsModule, NzEmptyModule, NzSkeletonModule],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
})
export class DashboardPage implements OnInit {
  private destroyRef = inject(DestroyRef);
  private dashboardService = inject(DashboardService);

  keywordCountChartOptions: KeywordCountChartOptions;
  diversityPerformanceChartOptions: DiversityPerformanceChartOptions;
  analysisDurationChartOptions: AnalysisDurationChartOptions;

  constructor() {
    this.keywordCountChartOptions = this.createKeywordCountChartOptions();
    this.diversityPerformanceChartOptions = this.createDiversityPerformanceChartOptions();
    this.analysisDurationChartOptions = this.createAnalysisDurationChartOptions();
  }

  ngOnInit(): void {
    const subscription = this.dashboardService.loadStats().subscribe((response) => this.updateChartsOptions(response));

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  private createKeywordCountChartOptions(): KeywordCountChartOptions {
    return {
      chart: { type: 'bar', height: 350, zoom: { enabled: false } },
      title: { text: 'Порівняння кількості ключових слів' },
      series: [],
      yaxis: { title: { text: 'Кількість ключових слів' } },
      xaxis: { labels: { show: false } },
      noData: { text: 'Завантаження даних...' },
    };
  }

  private createDiversityPerformanceChartOptions(): DiversityPerformanceChartOptions {
    return {
      chart: { type: 'line', height: 350, zoom: { enabled: false } },
      title: { text: 'Вплив diversity на швидкість аналізу текстів' },
      fill: { type: 'solid' },
      markers: { size: [6, 6] },
      series: [],
      yaxis: { title: { text: 'Час виконання аналізу, мс' } },
      xaxis: {
        title: { text: 'Параметр diversity' },
        labels: { formatter: (value: number) => value.toFixed(2) },
        tickAmount: 'dataPoints',
      },
      noData: { text: 'Завантаження даних...' },
    };
  }

  private createAnalysisDurationChartOptions(): AnalysisDurationChartOptions {
    return {
      chart: { type: 'area', height: 350, zoom: { enabled: false } },
      title: { text: 'Час виконання аналізу текстів' },
      series: [],
      yaxis: { title: { text: 'Час аналізу в секундах' } },
      xaxis: { labels: { show: false } },
      noData: { text: 'Завантаження даних...' },
    };
  }

  private updateChartsOptions(response: StatsResponse): void {
    this.updateKeywordCountChartOptions(response.keyword_count);
    this.updateDiversityPerformanceChartOptions(response.diversity_performance);
    this.updateAnalysisDurationChartOptions(response.analysis_duration);
  }

  private updateKeywordCountChartOptions(data: KeywordCountStats[]): void {
    this.keywordCountChartOptions.series = [
      {
        name: 'Вибір користувача',
        data: data.map(({ n_user }) => n_user),
      },
      {
        name: 'Рекомендація системи',
        data: data.map(({ n_semantic_recommended }) => n_semantic_recommended),
      },
      {
        name: 'Фактичне значення',
        data: data.map(({ n_final }) => n_final),
      },
    ];
  }

  private updateDiversityPerformanceChartOptions(data: DiversityPerformanceStats[]): void {
    this.diversityPerformanceChartOptions.series = [
      {
        name: 'KeyBERT (середній час)',
        type: 'scatter',
        data: data.map(({ diversity, avg_keybert_ms }) => ({ x: diversity, y: avg_keybert_ms })),
      },
      {
        name: 'LLM (середній час)',
        type: 'scatter',
        data: data.map(({ diversity, avg_llm_ms }) => ({ x: diversity, y: avg_llm_ms })),
      },
      {
        name: 'Середній тренд KeyBERT',
        type: 'line',
        data: data.map(({ diversity, avg_keybert_ms }) => ({ x: diversity, y: avg_keybert_ms })),
      },
      {
        name: 'Середній тренд LLM',
        type: 'line',
        data: data.map(({ diversity, avg_llm_ms }) => ({ x: diversity, y: avg_llm_ms })),
      },
    ];
  }

  private updateAnalysisDurationChartOptions(data: number[]): void {
    this.analysisDurationChartOptions.series = [{ name: 'Час виконання', data }];
  }
}
