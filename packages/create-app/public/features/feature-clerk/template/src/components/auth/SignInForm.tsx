import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignIn, useSignUp } from '@clerk/expo';

import { OAuthButtons } from './OAuthButtons';

export function SignInForm() {
  const { signIn, errors: signInErrors, fetchStatus: signInFetch } = useSignIn();
  const { signUp, errors: signUpErrors, fetchStatus: signUpFetch } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showCodeStep, setShowCodeStep] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isFetching = signInFetch === 'fetching' || signUpFetch === 'fetching';

  const handleSubmit = async () => {
    setFieldErrors({});

    const { error } = await signIn.password({ emailAddress, password });

    if (error) {
      if (error.errors?.[0]?.code === 'form_identifier_not_found') {
        const { error: signUpError } = await signUp.password({ emailAddress, password });
        if (signUpError) {
          const errs: Record<string, string> = {};
          for (const e of signUpError.errors ?? []) {
            if (e.meta?.paramName) errs[e.meta.paramName] = e.longMessage ?? e.message;
          }
          setFieldErrors(errs);
          return;
        }
        await signUp.verifications.sendEmailCode();
        setShowCodeStep(true);
        return;
      }

      const errs: Record<string, string> = {};
      for (const e of error.errors ?? []) {
        if (e.meta?.paramName) errs[e.meta.paramName] = e.longMessage ?? e.message;
      }
      setFieldErrors(errs);
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({ navigate: () => {} });
    } else if (signIn.status === 'needs_second_factor') {
      await signIn.mfa.sendEmailCode();
      setShowCodeStep(true);
    }
  };

  const handleVerifyCode = async () => {
    const { error } = await signUp.verifications.verifyEmailCode({ code });
    if (error) {
      setFieldErrors({ code: error.errors?.[0]?.longMessage ?? 'Invalid code' });
      return;
    }
    if (signUp.status === 'complete') {
      await signUp.finalize({ navigate: () => {} });
    }
  };

  const handleResendCode = async () => {
    await signUp.verifications.sendEmailCode();
  };

  if (showCodeStep) {
    return (
      <View className="gap-4">
        <Text className="text-center text-lg text-gray-600">
          Enter the verification code sent to {emailAddress}
        </Text>

        <TextInput
          value={code}
          onChangeText={setCode}
          placeholder="Verification code"
          keyboardType="number-pad"
          className="rounded-xl border border-gray-300 px-4 py-3 text-base"
        />
        {fieldErrors.code && (
          <Text className="text-sm text-red-500">{fieldErrors.code}</Text>
        )}

        <TouchableOpacity
          onPress={handleVerifyCode}
          disabled={isFetching || !code}
          className="items-center rounded-xl bg-blue-500 py-3 disabled:opacity-50"
        >
          {isFetching ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text className="text-base font-semibold text-white">Verify</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleResendCode} className="items-center py-2">
          <Text className="text-sm text-blue-500">Resend code</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="gap-4">
      <TextInput
        value={emailAddress}
        onChangeText={setEmailAddress}
        placeholder="Email address"
        keyboardType="email-address"
        autoCapitalize="none"
        className="rounded-xl border border-gray-300 px-4 py-3 text-base"
      />
      {fieldErrors.emailAddress && (
        <Text className="text-sm text-red-500">{fieldErrors.emailAddress}</Text>
      )}

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
        className="rounded-xl border border-gray-300 px-4 py-3 text-base"
      />
      {fieldErrors.password && (
        <Text className="text-sm text-red-500">{fieldErrors.password}</Text>
      )}

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isFetching || !emailAddress || !password}
        className="items-center rounded-xl bg-blue-500 py-3 disabled:opacity-50"
      >
        {isFetching ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-base font-semibold text-white">
            Continue
          </Text>
        )}
      </TouchableOpacity>

      <OAuthButtons />
    </View>
  );
}
