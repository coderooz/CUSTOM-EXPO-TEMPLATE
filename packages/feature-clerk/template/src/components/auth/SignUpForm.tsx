import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useSignUp } from '@clerk/expo';

export function SignUpForm() {
  const { signUp, errors, fetchStatus } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [showCodeStep, setShowCodeStep] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const isFetching = fetchStatus === 'fetching';

  const handleSubmit = async () => {
    setFieldErrors({});

    const { error } = await signUp.create({ emailAddress, password, firstName: name });

    if (error) {
      const errs: Record<string, string> = {};
      for (const e of error.errors ?? []) {
        if (e.meta?.paramName) errs[e.meta.paramName] = e.longMessage ?? e.message;
      }
      setFieldErrors(errs);
      return;
    }

    const { error: sendError } = await signUp.verifications.sendEmailCode();
    if (sendError) {
      setFieldErrors({ code: sendError.errors?.[0]?.longMessage ?? 'Failed to send code' });
      return;
    }

    setShowCodeStep(true);
  };

  const handleVerifyCode = async () => {
    const { error: verifyError } = await signUp.verifications.verifyEmailCode({ code });
    if (verifyError) {
      setFieldErrors({ code: verifyError.errors?.[0]?.longMessage ?? 'Invalid code' });
      return;
    }

    if (signUp.status === 'complete') {
      await signUp.finalize({ navigate: () => {} });
    }
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
            <Text className="text-base font-semibold text-white">Create Account</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => { setShowCodeStep(false); setCode(''); }}
          className="items-center py-2"
        >
          <Text className="text-sm text-gray-500">Back to sign-up</Text>
        </TouchableOpacity>

        <View nativeID="clerk-captcha" />
      </View>
    );
  }

  return (
    <View className="gap-4">
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Full name"
        autoCapitalize="words"
        className="rounded-xl border border-gray-300 px-4 py-3 text-base"
      />

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
          <Text className="text-base font-semibold text-white">Sign Up</Text>
        )}
      </TouchableOpacity>

      <View nativeID="clerk-captcha" />
    </View>
  );
}
