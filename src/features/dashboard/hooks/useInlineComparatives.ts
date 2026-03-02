import { useQuery } from '@tanstack/react-query';

import { ListInlineComparativesUseCase } from '../useCases/ListInlineComparativesUseCase';

import { InsightMockRepository } from '@/infra/mock/InsightMockRepository';

const repo = new InsightMockRepository();
const useCase = new ListInlineComparativesUseCase(repo);

export function useInlineComparatives() {
  return useQuery({
    queryKey: ['inline-comparatives'],
    queryFn: () => useCase.execute(),
    staleTime: 1000 * 60
  });
}
