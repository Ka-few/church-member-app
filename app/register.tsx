import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Link } from "expo-router";

export default function RegisterScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { signUp, loading } = useAuth();

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Error", "Passwords do not match");
            return;
        }
        try {
            await signUp(name, email, password);
        } catch (error: any) {
            Alert.alert("Registration Failed", "Could not create account. Try again.");
        }
    };

    return (
        <View className="flex-1 bg-[#FAFAF8]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} className="p-6">
                    <View className="items-center mb-8">
                        <View className="w-16 h-16 bg-[#C6A44A] rounded-full justify-center items-center shadow-lg mb-4">
                            <Text className="text-white text-2xl font-bold">SM</Text>
                        </View>
                        <Text className="text-2xl font-bold text-gray-800">Create Account</Text>
                        <Text className="text-gray-500 mt-2">Join our community today</Text>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-600 mb-2 font-medium">Full Name</Text>
                            <TextInput
                                className="w-full bg-white p-4 rounded-xl border border-[#EFE7C9] text-gray-700"
                                placeholder="John Doe"
                                placeholderTextColor="#9CA3AF"
                                value={name}
                                onChangeText={setName}
                            />
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-2 font-medium">Email Address</Text>
                            <TextInput
                                className="w-full bg-white p-4 rounded-xl border border-[#EFE7C9] text-gray-700"
                                placeholder="john@example.com"
                                placeholderTextColor="#9CA3AF"
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                keyboardType="email-address"
                            />
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-2 font-medium">Password</Text>
                            <TextInput
                                className="w-full bg-white p-4 rounded-xl border border-[#EFE7C9] text-gray-700"
                                placeholder="Create a password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <View>
                            <Text className="text-gray-600 mb-2 font-medium">Confirm Password</Text>
                            <TextInput
                                className="w-full bg-white p-4 rounded-xl border border-[#EFE7C9] text-gray-700"
                                placeholder="Confirm your password"
                                placeholderTextColor="#9CA3AF"
                                value={confirmPassword}
                                onChangeText={setConfirmPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleRegister}
                            disabled={loading}
                            className="w-full bg-[#C6A44A] p-4 rounded-xl items-center shadow-md mt-4 active:opacity-90"
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-bold text-lg">Sign Up</Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">Already have an account? </Text>
                            <Link href="/login" asChild>
                                <TouchableOpacity>
                                    <Text className="text-[#C6A44A] font-bold">Login</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
