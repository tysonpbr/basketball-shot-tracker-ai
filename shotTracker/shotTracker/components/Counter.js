import { StyleSheet, View, Text } from 'react-native';

export default function Counter({ label, count }) {
  return (
    <View style={styles.counterContainerSmall}>
      <View style={styles.counter}>
        <Text style={styles.counterLabel}>{label}: {count}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  counterContainerSmall: {
    width: 140,
    height: 50,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  counter: {
    borderRadius: 20,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: "#ffffff90"
  },
  counterLabel: {
    color: '#000000',
    fontSize: 16,
  },
});
