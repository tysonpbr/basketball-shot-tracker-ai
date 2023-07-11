import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import Button from './Button';

export default function Menu({ selectPage }) {
  return (
    <View style={styles.container}>
      <Button
        label="Shot Tracker"
        action={() => selectPage("ShotCounter")}
        style="wide"
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
