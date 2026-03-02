import { useMemo, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { YStack, Text, View, getTokens, Button, XStack, Spinner } from 'tamagui';

import { useDisclosure } from '@/shared/hooks/useDisclosure';

import { TransactionCard } from '../components/TransactionCard';
import { TransactionModal } from '../components/TransactionModal';
import { TransactionsFilters } from '../components/TransactionsFilters';
import { Transaction } from '../entities/Transaction';
import { useTransactions } from '../hooks/useTransactions';
import { TxFilters } from '../repository/TransactionRepository';
import { downloadReceipt } from '../utils/downloadReceipt';

export function TransactionsScreen() {
  const tokens = getTokens();
  const { open, onOpen, onClose } = useDisclosure();

  const [filters, setFilters] = useState<TxFilters | undefined>(undefined);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage, refetch, isRefetching } =
    useTransactions(filters);

  const items: Transaction[] = useMemo(
    () => data?.pages.flatMap((page) => page.items) ?? [],
    [data]
  );

  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  function handleEditTransaction(transaction: Transaction) {
    setSelectedTransaction(transaction);
    onOpen();
  }

  return (
    <YStack
      flex={1}
      paddingHorizontal="$4"
      paddingTop="$3"
      paddingBottom="$5"
      backgroundColor={tokens.color.$background}
    >
      <View flex={1} gap="$4">
        <XStack justifyContent="space-between" alignItems="center">
          <Text fontSize={20} fontWeight="800" color="$primary400">
            Transações
          </Text>
          <Button backgroundColor="$primary200" onPress={onOpen} alignSelf="flex-end">
            <Text fontWeight="bold" color="$gray100">
              Nova Transação
            </Text>
          </Button>
        </XStack>

        <TransactionsFilters onChange={setFilters} />

        {!items.length && !isLoading ? (
          <Text fontSize={14} color="black">
            Nenhuma transação encontrada.
          </Text>
        ) : (
          <FlatList
            data={items}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TransactionCard
                transaction={item}
                onEdit={() => handleEditTransaction(item)}
                onDownloadReceipt={() => downloadReceipt(item.receiptUrl as string)}
              />
            )}
            onEndReachedThreshold={0.6}
            onEndReached={() => hasNextPage && fetchNextPage()}
            ListFooterComponent={isFetchingNextPage ? <Spinner marginTop="$3" /> : null}
            refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          />
        )}
      </View>

      <TransactionModal
        open={open}
        onClose={() => {
          setSelectedTransaction(null);
          onClose();
        }}
        onSaved={refetch}
        transaction={selectedTransaction}
      />
    </YStack>
  );
}
