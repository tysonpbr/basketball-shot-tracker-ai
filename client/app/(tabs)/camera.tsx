import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useIsFocused } from '@react-navigation/native';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [shotsMade, setShotsMade] = useState(15);
  const [shotsAttempted, setShotsAttempted] = useState(20);
  const [started, setStarted] = useState(false);
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);
  const isFocused = useIsFocused();

  const [fontsLoaded] = useFonts({
    "JS-Regular": require("../../assets/fonts/JosefinSans-Regular.ttf"),
    "JS-Light": require("../../assets/fonts/JosefinSans-Light.ttf"),
    "JS-Bold": require("../../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) return null;

  useEffect(() => {
    const getCurrentOrientation = async () => {
      await ScreenOrientation.unlockAsync();
      const currentOrientation = await ScreenOrientation.getOrientationAsync();
      setOrientation(currentOrientation);
    };

    const handleOrientationChange = (event: ScreenOrientation.OrientationChangeEvent) => {
      setOrientation(event.orientationInfo.orientation);
    };

    getCurrentOrientation();
    const listener = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);
    return () => {
      ScreenOrientation.removeOrientationChangeListener(listener);
    };
  }, []);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionButton}>
          <Text style={styles.permissionButtonText}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (orientation !== 3 && orientation !== 4) {
    return (
      <View style={styles.rotationWarning}>
        <Text style={styles.warningText}>Please rotate your phone horizontally to continue</Text>
      </View>
    );
  }

  const percentage = ((shotsMade / shotsAttempted) * 100).toFixed(0);
  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.fullscreen}>
      {isFocused && (
        <CameraView style={StyleSheet.absoluteFillObject} facing={facing} />
      )}

      <SafeAreaView style={styles.overlay}>
        <View style={styles.topRight}>
          {/* <TouchableOpacity onPress={toggleCameraFacing}>
            <MaterialIcons name="flip-camera-ios" size={36} color="white" />
          </TouchableOpacity> */}
        </View>

        {started ?
          <View style={styles.bottomMenu}>
            <TouchableOpacity onPress={() => setStarted(false)} style={styles.startButton}>
              <Text style={styles.startButtonText}>End Workout</Text>
            </TouchableOpacity>
            
            <View style={styles.shotCount}>
              <Text style={styles.shotCountTitleText}>
                Shots Made:
              </Text>
              <Text style={styles.shotCountText}>
                {shotsMade}
              </Text>
            </View>
            
            <View style={styles.shotCount}>
              <Text style={styles.shotCountTitleText}>
                Shots Taken:
              </Text>
              <Text style={styles.shotCountText}>
                {shotsAttempted}
              </Text>
            </View>
            
            <View style={styles.shotCount}>
              <Text style={styles.shotCountTitleText}>
                Percentage:
              </Text>
              <Text style={styles.shotCountText}>
                {percentage}%
              </Text>
            </View>
          </View>
          :
          <View style={styles.bottomMenu}>
            <TouchableOpacity onPress={() => setStarted(true)} style={styles.startButton}>
              <Text style={styles.startButtonText}>Start</Text>
            </TouchableOpacity>
          </View>
        }
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  fullscreen: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  permissionText: {
    fontFamily: "JS-Bold",
    fontSize: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionButton: {
    backgroundColor: '#f15a22',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  permissionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  rotationWarning: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 24,
  },
  warningText: {
    fontFamily: "JS-Bold",
    color: '#f15a22',
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
  },
  topRight: {
    alignItems: 'flex-end',
    padding: 16,
  },
  orientationText: {
    fontFamily: "JS-Bold",
    color: '#ccc',
    fontSize: 12,
    marginTop: 4,
  },
  bottomMenu: {
    display: 'flex',
    alignSelf: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 16,
    gap: 40
  },
  startButton: {
    backgroundColor: '#f15a22',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  startButtonText: {
    fontFamily: "JS-Bold",
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  shotCount: {
    justifyContent: 'center',
  },
  shotCountTitleText: {
    fontFamily: "JS-Regular",
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  shotCountText: {
    fontFamily: "JS-Bold",
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold',
  },
});
