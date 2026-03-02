import { InsightRepository, InlineComparative } from '../repository/InsightRepository';

export class ListInlineComparativesUseCase {
  constructor(private repo: InsightRepository) {}

  async execute(): Promise<InlineComparative[]> {
    return this.repo.listInlineComparatives();
  }
}
