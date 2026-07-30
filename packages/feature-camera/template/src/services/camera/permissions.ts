import * as Camera from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export interface PermissionStatus {
  camera: boolean;
  mediaLibrary: boolean;
}

export async function requestAllPermissions(): Promise<PermissionStatus> {
  const camera = await Camera.requestCameraPermissionsAsync();
  const mediaLibrary = await ImagePicker.requestMediaLibraryPermissionsAsync();

  return {
    camera: camera.granted,
    mediaLibrary: mediaLibrary.granted,
  };
}

export async function getPermissionStatus(): Promise<PermissionStatus> {
  const camera = await Camera.getCameraPermissionsAsync();
  const mediaLibrary = await ImagePicker.getMediaLibraryPermissionsAsync();

  return {
    camera: camera.granted,
    mediaLibrary: mediaLibrary.granted,
  };
}
