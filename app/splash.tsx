import { useRouter } from "expo-router";
import * as SplashScreenExpo from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withTiming,
} from "react-native-reanimated";

export default function SplashScreen() {
  const skillOpacity = useSharedValue(0);

  const exaOpacity = useSharedValue(0);
  const exaScale = useSharedValue(0.3);

  const sparkOpacity = useSharedValue(0);
  const sparkScale = useSharedValue(0);

  const router = useRouter();

  // Delay before navigating to login (milliseconds). Change to 5000 for 5s.
  const SPLASH_NAV_DELAY_MS = 3000;
  const [secondsLeft, setSecondsLeft] = useState(
    Math.ceil(SPLASH_NAV_DELAY_MS / 1000)
  );

  useEffect(() => {
    // Skill fades in
    skillOpacity.value = withTiming(1, {
      duration: 1000,
    });

    // Exa appears
    exaOpacity.value = withDelay(
      900,
      withTiming(1, { duration: 400 })
    );

    // Exa pops
    exaScale.value = withDelay(
      900,
      withSequence(
        withTiming(1.2, { duration: 250 }),
        withTiming(1, { duration: 200 })
      )
    );

    // Spark appears
    sparkOpacity.value = withDelay(
      1400,
      withTiming(1, { duration: 300 })
    );

    // Spark pulse forever
    sparkScale.value = withDelay(
      1400,
      withRepeat(
        withSequence(
          withTiming(1.5, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        false
      )
    );
  }, []);

  useEffect(() => {
    console.log("Splash mounted, will navigate in", SPLASH_NAV_DELAY_MS, "ms");

    const timeout = setTimeout(() => {
      (async () => {
        try {
          console.log("Hiding native splash and navigating to /login");
          await SplashScreenExpo.hideAsync().catch(() => undefined);
          await router.push("/login");
        } catch (err) {
          console.error("Navigation to /login failed:", err);
          Alert.alert("Navigation error", String(err));
        }
      })();
    }, SPLASH_NAV_DELAY_MS);

    const interval = setInterval(() => {
      setSecondsLeft((s) => Math.max(0, s - 1));
    }, 1000);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [router]);

  const skillStyle = useAnimatedStyle(() => ({
    opacity: skillOpacity.value,
  }));

  const exaStyle = useAnimatedStyle(() => ({
    opacity: exaOpacity.value,
    transform: [{ scale: exaScale.value }],
  }));

  const sparkStyle = useAnimatedStyle(() => ({
    opacity: sparkOpacity.value,
    transform: [{ scale: sparkScale.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <Animated.Text
          style={[styles.logoText, styles.skillText, skillStyle]}>
          skill
        </Animated.Text>

        <Animated.View
          style={[styles.exaContainer, exaStyle]}>

          <Text style={[styles.logoText, styles.exaText]}>
            Exa
          </Text>

          <Animated.View
            style={[styles.sparkGlow, sparkStyle]}
          />

          <Animated.View
            style={[styles.sparkCore, sparkStyle]}
          />

        </Animated.View>
      </View>
      <View style={{ marginTop: 20, alignItems: "center" }}>
        <Text>{secondsLeft > 0 ? `Continuing in ${secondsLeft}s` : "Continuing..."}</Text>
        <TouchableOpacity
          style={styles.manualButton}
          onPress={async () => {
            await SplashScreenExpo.hideAsync().catch(() => undefined);
            router.push("/login");
          }}
        >
          <Text style={{ color: "#fff" }}>Continue Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  exaContainer: {
    position: "relative",
  },

  logoText: {
    fontSize: 64,
    fontWeight: "bold",
  },

  skillText: {
    color: "#2563EB",
  },

  exaText: {
    color: "#06B6D4",
  },

  sparkCore: {
    position: "absolute",
    top: -8,
    right: 10,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ffffff",
    zIndex: 2,
  },

  sparkGlow: {
    position: "absolute",
    top: -18,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "rgba(6,182,212,0.25)",
  },
  manualButton: {
    marginTop: 10,
    backgroundColor: "#06B6D4",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
});