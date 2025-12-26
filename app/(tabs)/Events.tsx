import { View, Text } from "react-native";

export default function EventsScreen() {
  return (
    <View className="flex-1 bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-4">Upcoming Events</Text>
      <Text className="text-gray-600">
        Parish events will appear here.
      </Text>
    </View>
  );
}
