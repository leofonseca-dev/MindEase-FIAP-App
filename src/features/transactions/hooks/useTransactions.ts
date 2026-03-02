// src/features/transactions/hooks/useTransactions.ts
import { useInfiniteQuery } from '@tanstack/react-query';

import { auth } from '@/infra/firebase/firebase';
import { FirebaseTransactionRepository } from '@/infra/firebase/repository/FirebaseTransactionRepository';

import { TxFilters } from '../repository/TransactionRepository';
import { ListTransactionsUseCase } from '../useCases/ListTransactionsUseCase';

const PAGE_SIZE = 10;

const repo = new FirebaseTransactionRepository();
const listTransactionsUseCase = new ListTransactionsUseCase(repo);

type PageResult = Awaited<ReturnType<ListTransactionsUseCase['execute']>>;

export function useTransactions(filters?: TxFilters) {
  const uid = auth.currentUser?.uid;

  return useInfiniteQuery<PageResult>({
    queryKey: ['transactions', uid, filters],
    enabled: !!uid,
    initialPageParam: undefined as any,
    queryFn: async ({ pageParam }) => {
      if (!uid) throw new Error('Usuário não autenticado.');
      return listTransactionsUseCase.execute(uid, PAGE_SIZE, pageParam, filters);
    },
    getNextPageParam: (lastPage) => (lastPage.hasMore ? lastPage.lastDocSnap : undefined)
  });
}
