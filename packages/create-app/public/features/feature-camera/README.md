# @coderooz/feature-camera

Camera and image picker feature for Coderooz Expo projects. Includes camera capture, gallery picker, image manipulation, and permission handling.

## What's Included

- Camera capture via `expo-camera`
- Image picker from gallery via `expo-image-picker`
- Image manipulation via `expo-image-manipulator`
- Unified permission handling
- React hook (`useCamera`) with flash and camera type toggling
- `expo-image-picker` plugin auto-registered

## Usage

```ts
import { pickFromGallery, takePhoto, useCamera } from '@/services/camera';

// Take a photo
const photo = await takePhoto({ quality: 0.8 });

// Pick from gallery
const image = await pickFromGallery({ allowsEditing: true });

// React hook
function CameraScreen() {
  const { cameraRef, type, toggleCameraType, capturePhoto } = useCamera();
  // ...
}
```

## Install

```sh
npx @coderooz/cli add camera
```
