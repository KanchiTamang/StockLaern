import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator, // Added for better UX
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ProfileScreen() {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false); // New loading state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  // Update this base URL if your ngrok link changes
  const BASE_URL = "https://winston-uncastigated-addictedly.ngrok-free.dev";

  const handleSubmit = async () => {
    // Validation
    if (!email || !password || (!isLogin && (!name || !number))) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const url = isLogin ? `${BASE_URL}/auth/login` : `${BASE_URL}/auth/signup`;

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // CRITICAL: This bypasses the ngrok warning page that blocks API calls
          "ngrok-skip-browser-warning": "true", 
        },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, number, email, password }
        ),
      });

      // Get raw text first to debug if JSON parsing fails
      const responseText = await response.text();
      let data;
      
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        console.error("Non-JSON response received:", responseText);
        throw new Error("Server did not return a valid JSON response");
      }

      if (!response.ok) {
        Alert.alert("Failure", data.message || "Server error");
        return;
      }

      Alert.alert("Success", isLogin ? "Login Successful" : "Signup Successful");
      
      // If you want to persist the login, you would save a token here
      router.push("/(tabs)/profile"); // Update to your actual dashboard route

    } catch (error) {
      console.log("Network Error:", error);
      Alert.alert("Connection Error", "Cannot connect to the server. Ensure ngrok is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#555" />
        </TouchableOpacity>

        <View>
          <Text style={styles.headerTitle}>{isLogin ? "Sign In" : "Sign Up"}</Text>
          <Text style={styles.headerSubtitle}>Welcome to StockLearn</Text>
        </View>
      </View>

      {/* FORM */}
      <View style={styles.formCard}>
        {!isLogin && (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                placeholder="name"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={styles.inputBlock}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="98XXXXXXXX"
                keyboardType="phone-pad"
                value={number}
                onChangeText={setNumber}
              />
            </View>
          </>
        )}

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="example@mail.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity 
          style={[styles.mainButton, loading && { opacity: 0.7 }]} 
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.mainButtonText}>
              {isLogin ? "Sign In" : "Create Account"}
            </Text>
          )}
        </TouchableOpacity>

        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Text
            style={styles.switchLink}
            onPress={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign Up" : "Sign In"}
          </Text>
        </Text>
      </View>

      {/* FEATURES CARDS */}
      <View style={styles.featuresRow}>
        <View style={styles.featureCard}>
          <Text style={styles.featureEmoji}>📚</Text>
          <Text style={styles.featureLabel}>Learn Basics</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureEmoji}>📊</Text>
          <Text style={styles.featureLabel}>Track Market</Text>
        </View>

        <View style={styles.featureCard}>
          <Text style={styles.featureEmoji}>🔔</Text>
          <Text style={styles.featureLabel}>Get Alerts</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { padding: 16, paddingTop: 60, flexDirection: "row", gap: 14 },
  backButton: { padding: 6, backgroundColor: "#f3f3f3", borderRadius: 10, alignSelf: 'center' },
  headerTitle: { fontSize: 20, fontWeight: "700", color: "#1E293B" },
  headerSubtitle: { fontSize: 13, color: "#64748B" },
  formCard: { margin: 20, padding: 24, borderRadius: 24, borderWidth: 1, borderColor: "#F1F5F9", backgroundColor: '#fff' },
  inputBlock: { marginBottom: 18 },
  label: { marginBottom: 8, fontSize: 14, fontWeight: "600", color: "#475569" },
  input: { borderWidth: 1, borderColor: "#E2E8F0", borderRadius: 12, padding: 14, fontSize: 15 },
  mainButton: { backgroundColor: "#4F46E5", padding: 16, borderRadius: 16, alignItems: "center", marginTop: 10 },
  mainButtonText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  switchText: { textAlign: "center", marginTop: 16, color: "#64748B" },
  switchLink: { color: "#4F46E5", fontWeight: "700" },
  featuresRow: { flexDirection: "row", justifyContent: "space-around", marginTop: 10 },
  featureCard: { alignItems: "center", padding: 10 },
  featureEmoji: { fontSize: 28, marginBottom: 8 },
  featureLabel: { fontSize: 12, fontWeight: "600", color: "#64748B" },
});