import { Stack, useRouter, usePathname } from "expo-router";
import { View, TouchableOpacity, Image, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";

const navLinks = [
  { title: "Home", icon: require("../../assets/icons/icon_home.png"), route: "/" },
  { title: "Camera", icon: require("../../assets/icons/icon_camera.png"), route: "/camera" },
  { title: "Account", icon: require("../../assets/icons/icon_account.png"), route: "/account" },
  { title: "Settings", icon: require("../../assets/icons/icon_settings.png"), route: "/settings" },
];

export default function CustomTabsLayout() {
  const router = useRouter();
  const pathname = usePathname();
  const [orientation, setOrientation] = useState<ScreenOrientation.Orientation | null>(null);

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
    const subscription = ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
    };
  }, []);

  const isPortrait = orientation === ScreenOrientation.Orientation.PORTRAIT_UP ||
                     orientation === ScreenOrientation.Orientation.PORTRAIT_DOWN;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} />

      {isPortrait && (
        <View style={styles.tabContainer}>
          {navLinks.map((link, i) => {
            const isActive = pathname === link.route;

            return (
              <View key={i} style={styles.tabWrapper}>
                <TouchableOpacity
                  onPress={() => router.push(link.route as any)}
                  style={[
                    styles.tabButton,
                    isActive ? styles.activeButton : null,
                  ]}
                >
                  <Image source={link.icon} style={styles.icon} />
                </TouchableOpacity>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  tabContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    paddingBottom: 24,
    paddingTop: 8,
    paddingHorizontal: 16,
    width: "100%",
    backgroundColor: "#ffffff",
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    zIndex: 50,
  },
  tabWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderRadius: 100,
    gap: 8,
  },
  activeButton: {
    backgroundColor: 'rgba(241, 90, 34, 0.1)'
  },
  icon: {
    width: 24,
    height: 24,
  },
});
