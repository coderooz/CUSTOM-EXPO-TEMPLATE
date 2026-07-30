import * as ImagePicker from 'expo-image-picker';
import { CameraType } from 'expo-camera';
import { useRef, useState, useCallback } from 'react';

export type MediaType = 'images' | 'videos' | 'mixed';
export type CameraMode = 'picture' | 'video';

export interface CaptureOptions {
  mediaTypes?: MediaType;
  allowsEditing?: boolean;
  quality?: number;
  base64?: boolean;
}

export async function pickFromGallery(options: CaptureOptions = {}): Promise<ImagePicker.ImagePickerSuccessResult | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) {
    throw new Error('Media library permission not granted');
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: options.mediaTypes ?? 'images',
    allowsEditing: options.allowsEditing ?? false,
    quality: options.quality ?? 0.8,
    base64: options.base64 ?? false,
  });

  if (result.canceled) return null;
  return result;
}

export async function takePhoto(options: CaptureOptions = {}): Promise<ImagePicker.ImagePickerSuccessResult | null> {
  const permission = await ImagePicker.requestCameraPermissionsAsync();
  if (!permission.granted) {
    throw new Error('Camera permission not granted');
  }

  const result = await ImagePicker.launchCameraAsync({
    mediaTypes: options.mediaTypes ?? 'images',
    allowsEditing: options.allowsEditing ?? false,
    quality: options.quality ?? 0.8,
    base64: options.base64 ?? false,
  });

  if (result.canceled) return null;
  return result;
}

export function useCamera() {
  const cameraRef = useRef<{ takePictureAsync: (options?: { base64?: boolean }) => Promise<{ uri: string } | null> }>(null);
  const [type, setType] = useState<CameraType>('back');
  const [flash, setFlash] = useState<'off' | 'on' | 'auto'>('off');

  const toggleCameraType = useCallback(() => {
    setType((prev: CameraType) => (prev === 'back' ? 'front' : 'back'));
  }, []);

  const capturePhoto = useCallback(async () => {
    if (cameraRef.current) {
      return await cameraRef.current.takePictureAsync({ base64: true });
    }
    return null;
  }, []);

  return { cameraRef, type, flash, setFlash, toggleCameraType, capturePhoto };
}
