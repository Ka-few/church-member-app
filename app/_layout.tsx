import "../global.css";
import { Stack, useRouter, useSegments, useRootNavigationState } from "expo-router";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";

function RootLayoutNav() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    if (!rootNavigationState?.key) return;

    const inAuthGroup = segments[0] === "(auth)"; // Keep for potential future use, though currently false
    const isLoginPage = segments[0] === "login";
    const isRegisterPage = segments[0] === "register";

    if (loading) return;

    if (!user) {
      // User is not logged in
      if (!isLoginPage && !isRegisterPage) {
        setTimeout(() => {
          router.replace("/login");
        }, 0);
      }
    } else {
      // User is logged in
      if (isLoginPage || isRegisterPage) {
        setTimeout(() => {
          router.replace("/(tabs)");
        }, 0);
      }
    }
  }, [user, segments, loading, rootNavigationState]);

  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
      {loading && (
        <View style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, justifyContent: "center", alignItems: "center", backgroundColor: 'rgba(255,255,255,0.7)', zIndex: 1000 }}>
          <ActivityIndicator size="large" color="#C6A44A" />
        </View>
      )}
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
