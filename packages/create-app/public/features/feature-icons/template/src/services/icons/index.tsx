import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Octicons from '@expo/vector-icons/Octicons';

import type { IconProps, IconButtonProps, IconFamily } from './types';
import { getCustomIcon } from './registry';

type VectorIconComponent = React.ComponentType<{ name: string; size?: number; color?: string }>;

const FAMILY_MAP: Record<IconFamily, VectorIconComponent | null> = {
  Ionicons: Ionicons as unknown as VectorIconComponent,
  MaterialIcons: MaterialIcons as unknown as VectorIconComponent,
  Feather: Feather as unknown as VectorIconComponent,
  MaterialCommunityIcons: MaterialCommunityIcons as unknown as VectorIconComponent,
  FontAwesome5: FontAwesome5 as unknown as VectorIconComponent,
  Octicons: Octicons as unknown as VectorIconComponent,
  Custom: null,
};

const DEFAULT_FAMILY: IconFamily = (process.env.EXPO_PUBLIC_ICON_DEFAULT_FAMILY as IconFamily) ?? 'Ionicons';

export function Icon({ name, size = 24, color = '#000', family }: IconProps) {
  const resolvedFamily = family ?? DEFAULT_FAMILY;

  if (resolvedFamily === 'Custom') {
    const custom = getCustomIcon(name);
    if (custom) {
      const { component: SvgComponent } = custom;
      return <SvgComponent width={size} height={size} fill={color} />;
    }
    return <View style={{ width: size, height: size }} />;
  }

  const IconComponent = FAMILY_MAP[resolvedFamily];
  if (!IconComponent) {
    return <View style={{ width: size, height: size }} />;
  }

  return <IconComponent name={name} size={size} color={color} />;
}

export function IconButton({
  name,
  size = 24,
  color = '#000',
  family,
  onPress,
  disabled = false,
  accessibilityLabel,
}: IconButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel ?? `${name} icon`}
      accessibilityRole="button"
      className="p-2"
    >
      <Icon name={name} size={size} color={disabled ? '#ccc' : color} family={family} />
    </TouchableOpacity>
  );
}

export { registerCustomIcon, hasCustomIcon } from './registry';
export type { IconProps, IconButtonProps, IconFamily } from './types';
