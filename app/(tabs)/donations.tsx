import { useEffect, useState } from "react";
import { View, Text, ScrollView, TextInput, TouchableOpacity, ActivityIndicator, Alert, Platform, Modal } from "react-native";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { Ionicons } from "@expo/vector-icons";

interface Donation {
  id: number;
  user_id?: number;
  amount: number;
  type: string;
  date: string | null;
  created_at?: string;
}

const DONATION_TYPES = [
  { label: "Tithe", value: "tithe" },
  { label: "Offering", value: "offering" },
  { label: "Thanksgiving", value: "thanksgiving" },
  { label: "Building Fund", value: "building_fund" },
  { label: "Special", value: "special" },
];

export default function DonationsScreen() {
  const { user } = useAuth();
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    user_id: "",
    amount: "",
    type: "tithe",
    date: new Date().toISOString().split('T')[0]
  });

  const fetchDonations = async () => {
    if (!user) return;
    setLoading(true);
    setError("");

    try {
      // Logic from user request: admin sees all, user sees theirs.
      // Adjusting endpoint if backend requires standard REST or specific user endpoint.
      // Preserving user requested logic:
      const endpoint = user?.role === "admin"
        ? "/donations/"
        : "/donations/my-donations";

      const response = await api.get(endpoint);
      setDonations(response.data);
    } catch (error: any) {
      console.error("Failed to fetch donations:", error);
      setError(error.response?.data?.error || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, [user]);

  const handleSubmit = async () => {
    setError("");

    try {
      const payload = user?.role === "admin"
        ? { ...form, user_id: Number(form.user_id), amount: Number(form.amount) }
        : { amount: Number(form.amount), type: form.type, date: form.date };

      const endpoint = user?.role === "admin" ? "/donations/admin/add" : "/donations/";

      await api.post(endpoint, payload);

      setForm({
        user_id: "",
        amount: "",
        type: "tithe",
        date: new Date().toISOString().split('T')[0]
      });
      setShowForm(false);
      fetchDonations();
      Alert.alert("Success", "Donation recorded successfully");
    } catch (error: any) {
      console.error(error);
      setError(error.response?.data?.error || "Failed to create donation");
      Alert.alert("Error", "Failed to create donation");
    }
  };

  const handleDelete = async (id: number) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this donation?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const endpoint = user?.role === "admin"
                ? `/donations/admin/${id}`
                : `/donations/${id}`;

              await api.delete(endpoint);
              fetchDonations();
            } catch (error: any) {
              setError(error.response?.data?.error || "Failed to delete donation");
              Alert.alert("Error", "Failed to delete donation");
            }
          }
        }
      ]
    );
  };

  const totalDonations = donations.reduce((sum, d) => sum + d.amount, 0);

  return (
    <ScrollView className="flex-1 bg-[#FAFAF8] p-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800">
          {user?.role === "admin" ? "All Donations" : "My Donations"}
        </Text>

        <TouchableOpacity
          onPress={() => setShowForm(!showForm)}
          className={`px-4 py-2 rounded-lg ${showForm ? "bg-gray-200" : "bg-[#C6A44A]"}`}
        >
          <Text className={`${showForm ? "text-gray-800" : "text-white"} font-semibold`}>
            {showForm ? "Cancel" : user?.role === "admin" ? "Add Record" : "Donate"}
          </Text>
        </TouchableOpacity>
      </View>

      {error ? (
        <View className="bg-red-50 p-4 rounded-lg mb-6 border border-red-100">
          <Text className="text-red-600">{error}</Text>
        </View>
      ) : null}

      {/* Donation Form */}
      {showForm && (
        <View className="bg-white p-5 rounded-2xl shadow-sm border border-[#E6D8A3] mb-6">
          <Text className="text-lg font-semibold text-[#C9A227] mb-4">
            {user?.role === "admin" ? "Add Donation Record" : "Make a Donation"}
          </Text>

          <View className="space-y-4">
            {user?.role === "admin" && (
              <View>
                <Text className="text-gray-600 mb-1 font-medium">User ID</Text>
                <TextInput
                  value={form.user_id}
                  onChangeText={(text) => setForm({ ...form, user_id: text })}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3"
                  placeholder="Enter User ID"
                  keyboardType="numeric"
                />
              </View>
            )}

            <View>
              <Text className="text-gray-600 mb-1 font-medium">Amount (KES)</Text>
              <TextInput
                value={form.amount}
                onChangeText={(text) => setForm({ ...form, amount: text })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3"
                placeholder="1000"
                keyboardType="numeric"
              />
            </View>

            <View>
              <Text className="text-gray-600 mb-2 font-medium">Type</Text>
              <View className="flex-row flex-wrap gap-2">
                {DONATION_TYPES.map((type) => (
                  <TouchableOpacity
                    key={type.value}
                    onPress={() => setForm({ ...form, type: type.value })}
                    className={`px-3 py-2 rounded-full border ${form.type === type.value ? "bg-[#C6A44A] border-[#C6A44A]" : "bg-white border-gray-300"}`}
                  >
                    <Text className={`${form.type === type.value ? "text-white" : "text-gray-600"} text-xs font-semibold`}>
                      {type.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View>
              <Text className="text-gray-600 mb-1 font-medium">Date (YYYY-MM-DD)</Text>
              <TextInput
                value={form.date}
                onChangeText={(text) => setForm({ ...form, date: text })}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl p-3"
                placeholder="2023-01-01"
              />
            </View>

            <TouchableOpacity
              onPress={handleSubmit}
              className="w-full bg-[#C9A227] p-4 rounded-xl items-center mt-2 shadow-sm active:opacity-90"
            >
              <Text className="text-white font-bold text-lg">Submit Donation</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Summary Card */}
      <View className="bg-[#C6A44A] p-6 rounded-2xl shadow-md mb-6 relative overflow-hidden">
        {/* Subtle pattern or gradient effect if needed */}
        <View className="opacity-10 absolute -right-10 -top-10 w-40 h-40 bg-white rounded-full" />
        <Text className="text-white text-lg font-medium mb-1 opacity-90">Total Donations</Text>
        <Text className="text-white text-4xl font-bold">KES {totalDonations.toLocaleString()}</Text>
        <Text className="text-white text-sm mt-2 opacity-80">{donations.length} donation(s) recorded</Text>
      </View>

      {/* Donations List */}
      {loading ? (
        <ActivityIndicator size="large" color="#C6A44A" className="mt-8" />
      ) : (
        <View className="pb-10">
          {donations.length === 0 ? (
            <Text className="text-center text-gray-500 mt-10">No donations recorded yet.</Text>
          ) : (
            donations.map((donation) => (
              <View
                key={donation.id}
                className="bg-white p-5 rounded-2xl mb-4 shadow-sm border border-[#EFE7C9]"
              >
                <View className="flex-row justify-between items-start">
                  <View className="flex-1">
                    {user?.role === "admin" && (
                      <Text className="text-xs text-gray-400 mb-1 font-medium">User #{donation.user_id}</Text>
                    )}
                    <Text className="font-bold text-xl text-[#C9A227]">
                      KES {donation.amount.toLocaleString()}
                    </Text>
                    <Text className="text-gray-700 font-medium capitalize mt-1">
                      {donation.type.replace('_', ' ')}
                    </Text>
                    <Text className="text-sm text-gray-500 mt-2">
                      {donation.date ? new Date(donation.date).toLocaleDateString() : 'No date'}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={() => handleDelete(donation.id)}
                    className="p-2 bg-red-50 rounded-lg"
                  >
                    <Ionicons name="trash-outline" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </View>
      )}
    </ScrollView>
  );
}
