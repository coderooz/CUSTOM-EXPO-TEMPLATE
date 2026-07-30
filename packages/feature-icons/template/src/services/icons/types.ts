import type { TextProps } from 'react-native';

export type IconFamily = 'Ionicons' | 'MaterialIcons' | 'Feather' | 'MaterialCommunityIcons' | 'FontAwesome5' | 'Octicons' | 'Custom';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  family?: IconFamily;
}

export interface IconButtonProps extends IconProps {
  onPress: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}
