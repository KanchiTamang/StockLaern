import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";

import {
  ActivityIndicator,
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

  // AUTH STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  // Remember Me
const [rememberMe, setRememberMe] = useState(false);

// Forgot Password flow
const [forgotMode, setForgotMode] = useState(false);
const [otp, setOtp] = useState("");
const [newPassword, setNewPassword] = useState("");


  const BASE_URL = "https://winston-uncastigated-addictedly.ngrok-free.dev";

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && (!name || !number))) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    const url = isLogin
      ? `${BASE_URL}/auth/login`
      : `${BASE_URL}/auth/signup`;

    setLoading(true);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, number, email, password }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Failure", data.message || "Server error");
        return;
      }

      Alert.alert("Success", isLogin ? "Login Successful" : "Signup Successful");
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert("Connection Error", "Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  // Dashboard part (where you will be redirected after login, signup)
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        {/* Top Bar */}
        <View style={styles.navBar}>
          <View style={styles.navTitleContainer}>
            <Text style={styles.navTitle}>My Dashboard</Text>
            <Text style={styles.navSubtitle}>
              Welcome , {name || "User"}!
            </Text>
          </View>

          <TouchableOpacity
            style={styles.menuBtn}
            onPress={() => setShowMenu(!showMenu)}
          >
            <Feather name="more-vertical" size={22} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {/* Dropdown */}
        {showMenu && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowMenu(false);
                setIsLoggedIn(false);
                setEmail("");
                setPassword("");
                setName("");
                setNumber("");
                setIsLogin(true);
              }}
            >
              <Feather name="log-out" size={18} color="#EF4444" />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }

  // Login and signup partt
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Feather name="arrow-left" size={24} color="#555" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>
            {isLogin ? "Sign In" : "Sign Up"}
          </Text>
          <Text style={styles.headerSubtitle}>Welcome to StockLearn</Text>
        </View>
      </View>

      <View style={styles.formCard}>
        {!isLogin && (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
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
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
        </View>

        <TouchableOpacity
          style={styles.mainButton}
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
    </ScrollView>
  );
}

// css styling part
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },

  header: {
    padding: 16,
    paddingTop: 60,
    flexDirection: "row",
    gap: 14,
  },

  backButton: {
    padding: 6,
    backgroundColor: "#f3f3f3",
    borderRadius: 10,
  },

  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#64748B",
  },

  formCard: {
    margin: 20,
    padding: 24,
    borderRadius: 24,
    backgroundColor: "#fff",
  },

  inputBlock: { marginBottom: 18 },

  label: {
    marginBottom: 8,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    padding: 14,
  },

  mainButton: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
  },

  mainButtonText: {
    color: "#fff",
    fontWeight: "700",
  },

  switchText: {
    textAlign: "center",
    marginTop: 16,
    color: "#64748B",
  },

  switchLink: {
    color: "#4F46E5",
    fontWeight: "700",
  },

  navBar: {
    paddingTop: 60,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  navTitleContainer: { flex: 1 },

  navTitle: {
    fontSize: 22,
    fontWeight: "700",
  },

  navSubtitle: {
    fontSize: 14,
    color: "#64748B",
  },

  menuBtn: { padding: 6 },

  dropdown: {
    position: "absolute",
    top: 90,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 5,
  },

  dropdownItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    gap: 8,
  },

  logoutText: {
    color: "#EF4444",
    fontWeight: "600",
  },
});
