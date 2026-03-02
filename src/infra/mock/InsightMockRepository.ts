import {
  InsightRepository,
  InlineComparative,
  InsightFilterEnum
} from '@/features/dashboard/repository/InsightRepository';

export class InsightMockRepository implements InsightRepository {
  async listInlineComparatives(): Promise<InlineComparative[]> {
    await new Promise((r) => setTimeout(r, 300));

    const MOCK_INSIGHTS: InlineComparative[] = [
      {
        id: InsightFilterEnum.TODAY,
        title: 'Dia',
        amount: 12345.67,
        compareAmount: 11000,
        diff: 1345.67,
        percentage: 12.23,
        chart: {
          data: [
            { label: '08:00', value: 500 },
            { label: '10:00', value: 1200 },
            { label: '12:00', value: 2200 },
            { label: '14:00', value: 1800 },
            { label: '16:00', value: 2600 },
            { label: '18:00', value: 3100 }
          ]
        }
      },
      {
        id: InsightFilterEnum.WEEK,
        title: 'Semana',
        amount: 84567.21,
        compareAmount: 80321.1,
        diff: 4246.11,
        percentage: 5.29,
        chart: {
          data: [
            { label: 'Seg', value: 9000 },
            { label: 'Ter', value: 12500 },
            { label: 'Qua', value: 11000 },
            { label: 'Qui', value: 15000 },
            { label: 'Sex', value: 22000 },
            { label: 'Sáb', value: 9000 },
            { label: 'Dom', value: 5067 }
          ]
        }
      },
      {
        id: InsightFilterEnum.MONTH,
        title: 'Mês',
        amount: 412345.9,
        compareAmount: 398765.4,
        diff: 13580.5,
        percentage: 3.41,
        chart: {
          data: [
            { label: '01', value: 12000 },
            { label: '05', value: 18000 },
            { label: '10', value: 24000 },
            { label: '15', value: 30000 },
            { label: '20', value: 28000 },
            { label: '25', value: 35000 },
            { label: '30', value: 42000 }
          ]
        }
      }
    ];

    return MOCK_INSIGHTS;
  }
}
