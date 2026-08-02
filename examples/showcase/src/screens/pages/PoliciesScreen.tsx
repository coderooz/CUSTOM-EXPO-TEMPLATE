import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';

const SECTIONS = [
  {
    key: 'privacy',
    title: 'Privacy Policy',
    content:
      'This app respects your privacy. We collect minimal data necessary to provide the service. No personal information is shared with third parties without your consent. Data is stored securely and you can request deletion at any time.',
  },
  {
    key: 'terms',
    title: 'Terms of Service',
    content:
      'By using this app, you agree to these terms. You may not use the service for any unlawful purpose. We reserve the right to update these terms at any time. Continued use after changes constitutes acceptance.',
  },
  {
    key: 'eula',
    title: 'End User License Agreement',
    content:
      'This app is licensed, not sold. You may install and use the app on devices you own. You may not modify, reverse-engineer, or distribute the app without permission.',
  },
  {
    key: 'data',
    title: 'Data & Security',
    content:
      'We implement industry-standard security measures. Data is encrypted in transit and at rest. We do not sell your personal data. For questions, contact us at coderooz@outlook.com.',
  },
];

export default function PoliciesScreen() {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6">
        <Text className="py-4 text-2xl font-bold text-gray-900">
          Policies
        </Text>

        {SECTIONS.map((section) => {
          const isOpen = expanded === section.key;
          return (
            <View
              key={section.key}
              className="mb-3 rounded-xl border border-gray-200"
            >
              <TouchableOpacity
                onPress={() => setExpanded(isOpen ? null : section.key)}
                className="flex-row items-center justify-between px-4 py-4"
              >
                <Text className="text-base font-semibold text-gray-900">
                  {section.title}
                </Text>
                <Text className="text-gray-400">{isOpen ? '▾' : '▸'}</Text>
              </TouchableOpacity>

              {isOpen && (
                <View className="px-4 pb-4">
                  <Text className="text-sm leading-6 text-gray-600">
                    {section.content}
                  </Text>
                </View>
              )}
            </View>
          );
        })}

        <Text className="mt-4 mb-8 text-center text-xs text-gray-400">
          Last updated: July 2026
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
