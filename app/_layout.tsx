// app/_layout.tsx

import { Tabs } from "expo-router";


export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#EFE7C9",
          height: 64,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 10,
        },
        tabBarActiveTintColor: "#C6A44A",
        tabBarInactiveTintColor: "#999",
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="(tabs)/Announcements"
        options={{ title: "Announcements", tabBarLabel: "Home" }}
      />
      <Tabs.Screen
        name="(tabs)/Members"
        options={{ title: "Members", tabBarLabel: "Members" }}
      />
      <Tabs.Screen
        name="(tabs)/Events"
        options={{ title: "Events", tabBarLabel: "Events" }}
      />
      <Tabs.Screen
        name="(tabs)/Donations"
        options={{ title: "Donations", tabBarLabel: "Donations" }}
      />
      <Tabs.Screen
        name="(tabs)/Sacraments"
        options={{ title: "Sacraments", tabBarLabel: "Sacraments" }}
      />
    </Tabs>
  );
}
