import { View, Text, TouchableOpacity } from "react-native";

export default function DonationsScreen() {
  return (
    <View className="flex-1 bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-6">
        Support the Church
      </Text>

      <TouchableOpacity
        className="bg-[#C6A44A] rounded-full py-4 items-center"
      >
        <Text className="text-white font-semibold text-lg">
          Make a Donation
        </Text>
      </TouchableOpacity>
    </View>
  );
}
