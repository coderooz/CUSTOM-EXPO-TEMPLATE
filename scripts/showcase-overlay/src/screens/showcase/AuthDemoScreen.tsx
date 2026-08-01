import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { Screen } from '@/components/layout/Screen';
import { Card } from '@/components/layout/Card';
import { VStack, HStack } from '@/components/layout/Stack';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useTheme } from '@/hooks/useTheme';
import { authService } from '@/services/auth';
import type { AuthState } from '@/services/auth';

export default function AuthDemoScreen() {
  const { colors } = useTheme();
  const [email, setEmail] = useState('demo@coderooz.in');
  const [password, setPassword] = useState('password');
  const [state, setState] = useState<AuthState>({
    isLoading: false,
    isAuthenticated: false,
    user: null,
    token: null,
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const unsubscribe = authService.subscribe(setState);
    authService.restoreSession();
    return unsubscribe;
  }, []);

  const handleLogin = async () => {
    try {
      setMessage('');
      const session = await authService.login({ email, password });
      setMessage(`Logged in as ${session.user.name} (token persisted to SecureStore)`);
    } catch (err: unknown) {
      setMessage(`Login failed: ${err instanceof Error ? err.message : 'unknown error'}`);
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    setMessage('Session cleared from SecureStore');
  };

  return (
    <Screen>
      <VStack gap={4}>
        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Auth demo
            </Text>
            <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>
              Uses expo-secure-store + authService. No real backend — login will fail unless an
              /api/auth/login endpoint exists.
            </Text>
            <Input label="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Input label="Password" value={password} onChangeText={setPassword} secureTextEntry />
            <HStack gap={2}>
              <Button title="Login" onPress={handleLogin} loading={state.isLoading} />
              <Button title="Logout" variant="outline" onPress={handleLogout} disabled={!state.isAuthenticated} />
            </HStack>
          </VStack>
        </Card>

        <Card p={4}>
          <VStack gap={2}>
            <Text style={{ color: colors.foreground, fontSize: 16, fontWeight: '600' }}>
              Auth state
            </Text>
            <View style={{ gap: 4 }}>
              <Row label="isAuthenticated" value={String(state.isAuthenticated)} />
              <Row label="user" value={state.user ? `${state.user.name} <${state.user.email}>` : 'null'} />
              <Row label="token" value={state.token ? `${state.token.slice(0, 16)}…` : 'null'} />
            </View>
            {message !== '' && <Text style={{ color: colors.mutedForeground, fontSize: 13 }}>{message}</Text>}
          </VStack>
        </Card>
      </VStack>
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  const { colors } = useTheme();
  return (
    <HStack gap={2}>
      <Text style={{ color: colors.mutedForeground, fontSize: 13, width: 120 }}>{label}</Text>
      <Text style={{ color: colors.foreground, fontSize: 13, flex: 1 }} numberOfLines={1} ellipsizeMode="middle">
        {value}
      </Text>
    </HStack>
  );
}
