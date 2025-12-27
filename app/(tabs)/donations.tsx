import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { getDonations, Donation } from "../../services/donations";

export default function DonationsScreen() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    getDonations().then(setDonations);
  }, []);

  return (
    <ScrollView className="bg-[#FAFAF8] p-4">
      <Text className="text-2xl font-semibold mb-4">My Donations</Text>

      {donations.map(d => (
        <View
          key={d.id}
          className="bg-white rounded-2xl p-4 mb-4 border border-[#EFE7C9]"
        >
          <Text className="font-semibold text-lg">KES {d.amount}</Text>
          <Text className="text-gray-600 mt-1">{d.purpose}</Text>
          <Text className="text-gray-500 text-sm mt-1">{d.date}</Text>
        </View>
      ))}
    </ScrollView>
  );
}
