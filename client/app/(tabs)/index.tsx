import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    "JS-Regular": require("../../assets/fonts/JosefinSans-Regular.ttf"),
    "JS-Light": require("../../assets/fonts/JosefinSans-Light.ttf"),
    "JS-Bold": require("../../assets/fonts/JosefinSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  const router = useRouter();

  const progressData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [52, 58, 54, 63, 61, 68, 71],
        strokeWidth: 3,
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: "#ffffff",
    backgroundGradientTo: "#ffffff",
    color: (opacity = 1) => `rgba(241, 90, 34, ${opacity})`,
    labelColor: () => "#6b7280",
    strokeWidth: 2,
    decimalPlaces: 0,
    propsForDots: {
      r: "4",
      strokeWidth: "1",
      stroke: "#f15a22",
    },
  };

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: "#ffffff" }}>
      <Text style={styles.logo}>SWISH</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Achievements</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🏅 1,000 Shots Logged</Text>
          <Text style={styles.cardSubtitle}>Unlocked May 21</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔥 10-Day Streak</Text>
          <Text style={styles.cardSubtitle}>Unlocked May 19</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Progress Chart</Text>
        <LineChart
          data={progressData}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          bezier
          style={styles.chart}
        />
        <Text style={styles.chartLabel}>Shooting Accuracy Over Last 7 Days</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/camera")}
        >
          <Text style={styles.actionText}>Open Camera</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/account")}
        >
          <Text style={styles.actionText}>View Account</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => router.push("/settings")}
        >
          <Text style={styles.actionText}>Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Recent Activity</Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout #4</Text>
          <Text style={styles.cardSubtitle}>150 shots • 63% • 12:47 PM, Today </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout #3</Text>
          <Text style={styles.cardSubtitle}>80 shots • 45% • 7:08 AM, Yesterday</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout #2</Text>
          <Text style={styles.cardSubtitle}>300 shots • 55% • 7:35 AM, May 20</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Workout #1</Text>
          <Text style={styles.cardSubtitle}>110 shots • 71% • 5:23 PM, May 19</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#ffffff",
    paddingTop: 64,
    paddingBottom: 100,
  },
  logo: {
    fontFamily: "JS-Bold",
    fontSize: 64,
    color: "#f15a22",
  },
  section: {
    marginTop: 32,
    width: "90%",
  },
  sectionTitle: {
    fontFamily: "JS-Bold",
    fontSize: 20,
    marginBottom: 16,
  },
  actionButton: {
    backgroundColor: "#f15a22",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
  },
  actionText: {
    color: "#ffffff",
    fontSize: 16,
    fontFamily: "JS-Bold",
  },
  card: {
    backgroundColor: "#f3f4f6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "JS-Regular",
    fontSize: 16,
    color: "#111827",
  },
  cardSubtitle: {
    fontFamily: "JS-Light",
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  chart: {
    borderRadius: 12,
  },
  chartLabel: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "JS-Light",
    color: "#6b7280",
    textAlign: "center",
  },
});
