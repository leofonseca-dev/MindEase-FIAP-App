import { useCallback } from 'react';
import { Image } from 'react-native';
import {
  Card,
  Input,
  Label,
  Separator,
  Text,
  XStack,
  YStack,
  Switch,
  Button,
  ScrollView
} from 'tamagui';

import { useDispatch, useSelector } from '@/store/Store';

import type { AppState } from '@/store/Store';
import { updateProfile } from '@/store/user/UserSlice';
import {
  setNeed,
  setRoutine,
  savePreferencesToStorage
} from '@/store/preferences/PreferencesSlice';
import DashboardPreferencesBar from '@/features/dashboard/components/DashboardPreferencesBar';

type NeedKey = keyof AppState['preferences']['needs'];
type BestTime = AppState['preferences']['routine']['bestTimeOfDay'];

export default function ProfileScreen() {
  const dispatch = useDispatch();

  const prefs = useSelector((s: AppState) => s.preferences);
  const profile = useSelector((s: AppState) => s.user.profile);

  const persistPrefs = useCallback(() => {
    dispatch(savePreferencesToStorage() as any);
  }, [dispatch]);

  const onChangeProfile = useCallback(
    (patch: Partial<typeof profile>) => {
      dispatch(updateProfile(patch) as any);
    },
    [dispatch, profile]
  );

  const onToggleNeed = useCallback(
    (key: NeedKey, value: boolean) => {
      dispatch(setNeed({ key, value }));
      persistPrefs();
    },
    [dispatch, persistPrefs]
  );

  const onChangeBestTime = useCallback(
    (value: BestTime) => {
      dispatch(setRoutine({ key: 'bestTimeOfDay', value }));
      persistPrefs();
    },
    [dispatch, persistPrefs]
  );

  const onToggleBreakReminder = useCallback(
    (value: boolean) => {
      dispatch(setRoutine({ key: 'breakReminder', value }));
      persistPrefs();
    },
    [dispatch, persistPrefs]
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <YStack
        flex={1}
        paddingHorizontal="$4"
        paddingTop="$4"
        paddingBottom="$6"
        gap="$4"
        marginBottom="$12"
      >
        <Card
          padding="$4"
          backgroundColor="$color1"
          borderRadius={12}
          borderWidth={1}
          borderColor="$color5"
        >
          <XStack alignItems="center" gap="$3">
            <YStack
              width={72}
              height={72}
              borderRadius={999}
              overflow="hidden"
              backgroundColor="$color3"
              alignItems="center"
              justifyContent="center"
            >
              <Image
                source={require('../../../assets/images/profile/user-1.jpg')}
                style={{ width: 72, height: 72 }}
                resizeMode="cover"
              />
            </YStack>

            <YStack flex={1} gap="$1">
              <Text fontSize={16} fontWeight="900">
                {profile?.name || 'Seu nome'}
              </Text>
              <Text opacity={0.7}>{profile?.role || 'Área / Cargo'}</Text>
              <Text opacity={0.7}>{profile?.email || 'email@exemplo.com'}</Text>
            </YStack>
          </XStack>

          <Separator marginVertical="$3" />

          <YStack gap="$3">
            <YStack gap="$1">
              <Label>Nome</Label>
              <Input
                value={profile?.name ?? ''}
                onChangeText={(v) => onChangeProfile({ name: v })}
                placeholder="Seu nome"
              />
            </YStack>

            <YStack gap="$1">
              <Label>E-mail</Label>
              <Input
                value={profile?.email ?? ''}
                onChangeText={(v) => onChangeProfile({ email: v })}
                placeholder="email@exemplo.com"
                autoCapitalize="none"
                keyboardType="email-address"
              />
            </YStack>

            <YStack gap="$1">
              <Label>Área / Cargo</Label>
              <Input
                value={profile?.role ?? ''}
                onChangeText={(v) => onChangeProfile({ role: v })}
                placeholder="Ex: Desenvolvedor"
              />
            </YStack>
          </YStack>
        </Card>

        <DashboardPreferencesBar />

        <Card
          padding="$4"
          backgroundColor="$color1"
          borderRadius={12}
          borderWidth={1}
          borderColor="$color5"
          gap="$3"
        >
          <YStack gap="$1">
            <Text fontWeight="900" fontSize={16}>
              Necessidades específicas
            </Text>
            <Text opacity={0.7} fontSize={12}>
              Isso ajuda a adaptar alertas, ritmo e interface.
            </Text>
          </YStack>

          <YStack gap="$2">
            <NeedRow
              label="TDAH"
              checked={prefs.needs.adhd}
              onToggle={(v) => onToggleNeed('adhd', v)}
            />
            <NeedRow
              label="Dislexia"
              checked={prefs.needs.dyslexia}
              onToggle={(v) => onToggleNeed('dyslexia', v)}
            />
            <NeedRow
              label="Ansiedade"
              checked={prefs.needs.anxiety}
              onToggle={(v) => onToggleNeed('anxiety', v)}
            />
            <NeedRow
              label="TEA (Autismo)"
              checked={prefs.needs.autism}
              onToggle={(v) => onToggleNeed('autism', v)}
            />
            <NeedRow
              label="Sobrecarga sensorial"
              checked={prefs.needs.sensoryOverload}
              onToggle={(v) => onToggleNeed('sensoryOverload', v)}
            />
          </YStack>

          <Separator />

          <YStack gap="$1">
            <Text fontWeight="900" fontSize={16}>
              Rotina
            </Text>
            <Text opacity={0.7} fontSize={12}>
              Para manter previsibilidade e transições suaves.
            </Text>
          </YStack>

          <YStack gap="$2">
            <Text fontWeight="800" opacity={0.85}>
              Melhor período do dia
            </Text>

            <RadioRow
              label="Manhã"
              selected={prefs.routine.bestTimeOfDay === 'MORNING'}
              onPress={() => onChangeBestTime('MORNING')}
            />
            <RadioRow
              label="Tarde"
              selected={prefs.routine.bestTimeOfDay === 'AFTERNOON'}
              onPress={() => onChangeBestTime('AFTERNOON')}
            />
            <RadioRow
              label="Noite"
              selected={prefs.routine.bestTimeOfDay === 'NIGHT'}
              onPress={() => onChangeBestTime('NIGHT')}
            />

            <Separator />

            <NeedRow
              label="Lembrar pausas curtas automaticamente"
              checked={prefs.routine.breakReminder}
              onToggle={(v) => onToggleBreakReminder(v)}
            />
          </YStack>

          <Button
            marginTop="$2"
            variant="outlined"
            onPress={() => persistPrefs()}
            alignSelf="flex-start"
          >
            Salvar preferências
          </Button>
        </Card>
      </YStack>
    </ScrollView>
  );
}

function NeedRow({
  label,
  checked,
  onToggle
}: {
  label: string;
  checked: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      gap="$3"
      padding="$3"
      borderRadius={10}
      borderWidth={1}
      borderColor="$color5"
      backgroundColor="$color2"
    >
      <Text fontWeight="800" flex={1}>
        {label}
      </Text>

      <Switch
        checked={checked}
        onCheckedChange={(v) => onToggle(!!v)}
        width={46}
        height={28}
        borderRadius={999}
        backgroundColor={checked ? '$primary400' : '$color5'}
        borderWidth={1}
        borderColor="$color6"
        padding="$0.5"
      >
        <Switch.Thumb width={22} height={22} borderRadius={999} backgroundColor="$color1" />
      </Switch>
    </XStack>
  );
}

function RadioRow({
  label,
  selected,
  onPress
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Button
      onPress={onPress}
      backgroundColor="$color2"
      borderWidth={1}
      borderColor={selected ? '$primary400' : '$color5'}
      justifyContent="flex-start"
      paddingVertical="$3"
      paddingHorizontal="$3"
      borderRadius={10}
    >
      <XStack alignItems="center" gap="$2">
        <YStack
          width={18}
          height={18}
          borderRadius={999}
          borderWidth={2}
          borderColor={selected ? '$primary400' : '$color6'}
          alignItems="center"
          justifyContent="center"
        >
          {selected && (
            <YStack width={10} height={10} borderRadius={999} backgroundColor="$primary400" />
          )}
        </YStack>

        <Text fontWeight="800">{label}</Text>
      </XStack>
    </Button>
  );
}
