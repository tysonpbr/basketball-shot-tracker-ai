import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Button from './Button';
import Counter from './Counter';
import { Camera } from 'expo-camera';

export default function ShotCounter({ selectPage }) {
  const [started, setStarted] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraRef, setCameraRef] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={ref => setCameraRef(ref)}
      >
        <View style={styles.buttonBarTop}>
          <Button
            opaque={true}
            label="Back"
            action={() => selectPage("Menu")}
            style="small"
          />
          {started ?
            <Button
              opaque={true}
              label="End"
              action={() => setStarted(false)}
              style="small"
            />
            :
            <Button
              opaque={true}
              label="Start"
              action={() => setStarted(true)}
              style="small"
            />
          }
        </View>
        {started && 
          <View style={styles.buttonBarBottom}>
          <Counter
            label="Shots"
            count={0}
          />
          <Counter
            label="Makes"
            count={0}
          />
          <Counter
            label="Misses"
            count={0}
          />
        </View>
        }
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonBarTop: {
    backgroundColor: '#ffffff00',
    width: '100%',
    height: 50,
    justifyContent: "space-between",
    alignItems: 'space-between',
    flexDirection: 'row'
  },
  buttonBarBottom: {
    backgroundColor: '#ffffff20',
    width: '100%',
    height: 80,
    justifyContent: "center",
    alignItems: 'center',
    flexDirection: 'row'
  }
});
