import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = () => {
    // Later replace with your authentication logic
    //router.push("/dashboard");
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

      {/* LOGO + TEXT */}
      <View style={styles.logoSection}>
        <View style={styles.logoBox}>
          <Feather name="trending-up" size={32} color="#fff" />
        </View>
        <Text style={styles.logoTitle}>
          {isLogin ? "Welcome Back!" : "Create Your Account"}
        </Text>
        <Text style={styles.logoDesc}>
          {isLogin ? "Sign in to access your dashboard" : "Start your learning journey"}
        </Text>
      </View>

      {/* FORM */}
      <View style={styles.formCard}>
        {!isLogin && (
          <View style={styles.inputBlock}>
            <Text style={styles.label}>Full Name</Text>
            <View style={styles.inputWrapper}>
              <Feather name="user" size={20} color="#aaa" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter your name"
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        )}

        {/* EMAIL */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={20} color="#aaa" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>

        {/* PASSWORD */}
        <View style={styles.inputBlock}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={20} color="#aaa" style={styles.inputIcon} />
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
        </View>

        {/* REMEMBER + FORGOT */}
        {isLogin && (
          <View style={styles.rowBetween}>
            <Text style={styles.remember}>Remember me</Text>
            <Text style={styles.forgot}>Forgot?</Text>
          </View>
        )}

        {/* SUBMIT BUTTON */}
        <TouchableOpacity style={styles.mainButton} onPress={handleSubmit}>
          <Text style={styles.mainButtonText}>
            {isLogin ? "Sign In" : "Create Account"}
          </Text>
        </TouchableOpacity>

        {/* SWITCH LOGIN | SIGNUP */}
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

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderColor: "#eee",
    gap: 14,
    backgroundColor: "#fff",
  },
  backButton: {
    padding: 6,
    borderRadius: 10,
    backgroundColor: "#f3f3f3",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", color: "#222" },
  headerSubtitle: { fontSize: 12, color: "#666" },

  logoSection: { alignItems: "center", marginTop: 30, marginBottom: 20 },
  logoBox: {
    width: 70,
    height: 70,
    borderRadius: 20,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },
  logoTitle: { fontSize: 20, fontWeight: "700", marginTop: 12 },
  logoDesc: { color: "#666", fontSize: 13, marginTop: 4 },

  formCard: {
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#eee",
    elevation: 2,
    marginBottom: 20,
  },

  inputBlock: { marginBottom: 18 },
  label: { fontSize: 14, color: "#333", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 14,
    paddingHorizontal: 10,
    backgroundColor: "#fafafa",
  },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 14 },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  remember: { color: "#555", fontSize: 13 },
  forgot: { color: "#4F46E5", fontSize: 13 },

  mainButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 16,
  },
  mainButtonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  switchText: { textAlign: "center", color: "#555", fontSize: 14 },
  switchLink: { color: "#4F46E5", fontWeight: "600" },

  featuresRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 10,
  },
  featureCard: {
    width: "32%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  featureEmoji: { fontSize: 28, marginBottom: 6 },
  featureLabel: { fontSize: 12, color: "#555" },
});
