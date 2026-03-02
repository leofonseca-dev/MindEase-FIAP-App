export enum InsightFilterEnum {
  TODAY = 'TODAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH'
}

export type ChartPoint = { label: string; value: number };

export type InlineComparative = {
  id: string | number;
  title: string;
  amount: number;
  compareAmount: number;
  diff: number;
  percentage: number;
  chart: { data: ChartPoint[] };
};

export interface InsightRepository {
  listInlineComparatives(): Promise<InlineComparative[]>;
}
