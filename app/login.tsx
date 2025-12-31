import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Link } from "expo-router";

export default function LoginScreen() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { signIn, loading } = useAuth();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Error", "Please fill in all fields");
            return;
        }
        try {
            await signIn(email, password);
        } catch (error: any) {
            Alert.alert("Login Failed", "Invalid credentials or network error");
        }
    };

    return (
        <View className="flex-1 bg-[#FAFAF8]">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }} className="p-6">
                    <View className="items-center mb-10">
                        <View className="w-20 h-20 bg-[#C6A44A] rounded-full justify-center items-center shadow-lg mb-4">
                            <Text className="text-white text-3xl font-bold">SM</Text>
                        </View>
                        <Text className="text-3xl font-bold text-gray-800">Welcome Back</Text>
                        <Text className="text-gray-500 mt-2">Sign in to continue</Text>
                    </View>

                    <View className="space-y-4">
                        <View>
                            <Text className="text-gray-600 mb-2 font-medium">Email Address</Text>
                            <TextInput
                                className="w-full bg-white p-4 rounded-xl border border-[#EFE7C9] text-gray-700"
                                placeholder="Enter your email"
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
                                placeholder="Enter your password"
                                placeholderTextColor="#9CA3AF"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleLogin}
                            disabled={loading}
                            className="w-full bg-[#C6A44A] p-4 rounded-xl items-center shadow-md mt-6 active:opacity-90"
                        >
                            {loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text className="text-white font-bold text-lg">Sign In</Text>
                            )}
                        </TouchableOpacity>

                        <View className="flex-row justify-center mt-6">
                            <Text className="text-gray-500">Don't have an account? </Text>
                            <Link href="/register" asChild>
                                <TouchableOpacity>
                                    <Text className="text-[#C6A44A] font-bold">Register</Text>
                                </TouchableOpacity>
                            </Link>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}
