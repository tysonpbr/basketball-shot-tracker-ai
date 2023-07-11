import { StyleSheet, View, Pressable, Text } from 'react-native';

export default function Button({ label, action, style, opaque }) {
  if (style === "wide") {
    if (opaque) {
      return (
        <View style={styles.buttonContainerWide}>
          <Pressable style={styles.buttonOpaque} onPress={() => action()}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.buttonContainerWide}>
        <Pressable style={styles.button} onPress={() => action()}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  } else if (style === "small") {
    if (opaque) {
      return (
        <View style={styles.buttonContainerSmall}>
          <Pressable style={styles.buttonOpaque} onPress={() => action()}>
            <Text style={styles.buttonLabel}>{label}</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View style={styles.buttonContainerSmall}>
        <Pressable style={styles.button} onPress={() => action()}>
          <Text style={styles.buttonLabel}>{label}</Text>
        </Pressable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  buttonContainerWide: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonContainerSmall: {
    width: 70,
    height: 40,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  buttonOpaque: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#ffffff99"
  },
  button: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#ffffff"
  },
  buttonLabel: {
    color: '#000000',
    fontSize: 16,
  },
});
