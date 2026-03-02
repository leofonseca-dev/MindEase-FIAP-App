import { useQuery } from '@tanstack/react-query';

import { InsightMockRepository } from '@/infra/mock/InsightMockRepository';

import { ListInlineComparativesUseCase } from '../useCases/ListInlineComparativesUseCase';

const repo = new InsightMockRepository();
const useCase = new ListInlineComparativesUseCase(repo);

export function useInlineComparatives() {
  return useQuery({
    queryKey: ['inline-comparatives'],
    queryFn: () => useCase.execute(),
    staleTime: 1000 * 60
  });
}
