import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getSacraments, Sacrament } from "../../services/sacraments";

export default function SacramentsScreen() {
  const [sacraments, setSacraments] = useState<Sacrament[]>([]);

  useEffect(() => {
    getSacraments().then(setSacraments);
  }, []);

  return (
    <ScrollView className="bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-4">My Sacraments</Text>

      {sacraments.map(item => (
        <View
          key={item.id}
          className="bg-white rounded-2xl p-4 mb-4 border border-[#EFE7C9]"
        >
          <Text className="font-semibold text-lg">{item.name}</Text>
          <Text className="text-gray-600 mt-1">
            Status: {item.status}
          </Text>
          {item.date && (
            <Text className="text-gray-500 text-sm mt-1">
              Date: {item.date}
            </Text>
          )}
        </View>
      ))}
    </ScrollView>
  );
}
