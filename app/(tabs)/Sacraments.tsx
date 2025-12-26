import { View, Text } from "react-native";

export default function SacramentsScreen() {
  return (
    <View className="flex-1 bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-4">
        Sacrament Journey
      </Text>
      <Text className="text-gray-600">
        Baptism, Confirmation, Eucharist progress will appear here.
      </Text>
    </View>
  );
}
