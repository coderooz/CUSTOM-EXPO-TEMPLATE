/** @format
 * @coderooz
 * @author (Ranit Saha) <coderooz.dev@gmail.com>
 * @description A reusable button component
 * @filePath src/components/items/Button.tsx 
 * @accessPath @/components/items/Button
 * @created 2025-11-23
 * @lastModified 2025-11-23
 * @version 1.0.0
 */

import { ActivityIndicator, TouchableOpacity, Text, View } from "react-native";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant =
  | "default"
  | "outline"
  | "destructive"
  | "ghost"
  | "link";

type Size = "sm" | "md" | "lg" | "icon";

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onPress?: () => void;
}

export default function Button({
  children,
  variant = "default",
  size = "md",
  className,
  fullWidth,
  disabled,
  loading,
  leftIcon,
  rightIcon,
  onPress,
}: ButtonProps) {
  const variantStyles: Record<Variant, string> = {
    default: "bg-purple-600 active:bg-purple-700",
    outline: "border border-neutral-400 bg-transparent",
    destructive: "bg-red-600 active:bg-red-700",
    ghost: "bg-transparent",
    link: "bg-transparent",
  };

  const textStyles: Record<Variant, string> = {
    default: "text-white",
    outline: "text-neutral-700",
    destructive: "text-white",
    ghost: "text-neutral-700",
    link: "text-purple-600 underline",
  };

  const sizeStyles: Record<Size, string> = {
    sm: "px-4 py-2 rounded-lg text-sm",
    md: "px-5 py-3 rounded-xl text-base",
    lg: "px-6 py-4 rounded-2xl text-lg",
    icon: "p-3 rounded-full",
  };

  return (
    <TouchableOpacity
      disabled={disabled || loading}
      onPress={onPress}
      className={cn(
        "flex-row items-center justify-center",
        variantStyles[variant],
        sizeStyles[size],
        fullWidth ? "w-full" : "",
        disabled ? "opacity-50" : "",
        className
      )}
    >
      {loading ? (
        <ActivityIndicator color={variant === "default" ? "white" : "black"} />
      ) : (
        <View className="flex-row items-center space-x-2">
          {leftIcon && <View>{leftIcon}</View>}
          <Text className={cn("font-semibold", textStyles[variant])}>{children}</Text>
          {rightIcon && <View>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
}
