import { Feather } from "@expo/vector-icons";
import { useNavigation, useRouter } from "expo-router";
import { useLayoutEffect, useState } from "react";
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
  const navigation = useNavigation();

  // AUTH STATES
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: isLoggedIn ? "flex" : "none",
      },
    });
  }, [navigation, isLoggedIn]);

  // FORM STATES
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [wardNo, setWardNo] = useState("");

  const BASE_URL = "https://winston-uncastigated-addictedly.ngrok-free.dev";
  const wardNumbers = Array.from({ length: 32 }, (_, i) => (i + 1).toString());

  const handleSubmit = async () => {
    // Validation
    if (!email || !password || (!isLogin && (!name || !number || !address || !wardNo))) {
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
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify(
          isLogin
            ? { email, password }
            : { name, number, email, password, address, wardNo }
        ),
      });

      const data = await response.json();

      if (!response.ok) {
        Alert.alert("Failure", data.message || "Server error");
        return;
      }

      Alert.alert("Success", isLogin ? "Login Successful" : "Signup Successful");
      setIsLoggedIn(true);
      // Redirect to dashboard
      router.push("/(tabs)/dashboard");
    } catch (error) {
      Alert.alert("Connection Error", "Cannot connect to the server.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // For now, simulate successful Google signup
    Alert.alert("Success", "Google Sign-up Successful");
    setIsLoggedIn(true);
    // Redirect to dashboard
    router.push("/(tabs)/dashboard");
  };

  // --- DASHBOARD VIEW ---
  if (isLoggedIn) {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <View style={styles.navTitleContainer}>
            <Text style={styles.navTitle}>My Dashboard</Text>
            <Text style={styles.navSubtitle}>Welcome, {name || email.split('@')[0]}!</Text>
          </View>
          <TouchableOpacity style={styles.menuBtn} onPress={() => setShowMenu(!showMenu)}>
            <Feather name="more-vertical" size={22} color="#1E293B" />
          </TouchableOpacity>
        </View>

        {showMenu && (
          <View style={styles.dropdown}>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => {
                setShowMenu(false);
                setIsLoggedIn(false);
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

  // --- AUTH VIEW (Login/Signup) ---
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Dynamic Header */}
      <View style={styles.headerGradient}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <View style={styles.iconContainer}>
            <Feather name="trending-up" size={24} color="#fff" />
          </View>
          <Text style={styles.headerTitle}>Welcome to StockLearn</Text>
          <Text style={styles.headerSubtitle}>
            {isLogin ? "Login to access personalized features" : "Join to get market alerts"}
          </Text>
        </View>
      </View>

      <View style={styles.formCard}>
        {/* Toggle Switch */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[styles.toggleBtn, isLogin && styles.toggleActive]}
            onPress={() => setIsLogin(true)}
          >
            <Text style={[styles.toggleText, isLogin && styles.toggleTextActive]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleBtn, !isLogin && styles.toggleActive]}
            onPress={() => setIsLogin(false)}
          >
            <Text style={[styles.toggleText, !isLogin && styles.toggleTextActive]}>Sign Up</Text>
          </TouchableOpacity>
        </View>

        {/* Form Fields */}
        {!isLogin && (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputWrapper}>
                <Feather name="user" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Enter your name" value={name} onChangeText={setName} />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="phone" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput style={styles.input} keyboardType="phone-pad" placeholder="Enter phone number" value={number} onChangeText={setNumber} />
              </View>
            </View>
          </>
        )}

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Email Address</Text>
          <View style={styles.inputWrapper}>
            <Feather name="mail" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput style={styles.input} autoCapitalize="none" placeholder="your@email.com" value={email} onChangeText={setEmail} />
          </View>
        </View>

        <View style={styles.inputBlock}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.inputWrapper}>
            <Feather name="lock" size={18} color="#94A3B8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              secureTextEntry={!showPassword}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Feather name={showPassword ? "eye" : "eye-off"} size={18} color="#94A3B8" />
            </TouchableOpacity>
          </View>
        </View>

        {!isLogin && (
          <>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputWrapper}>
                <Feather name="map-pin" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput style={styles.input} placeholder="Enter your address" value={address} onChangeText={setAddress} />
              </View>
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.label}>Ward Number</Text>
              <View style={styles.inputWrapper}>
                <Feather name="home" size={18} color="#94A3B8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Select ward (1-32)"
                  keyboardType="numeric"
                  value={wardNo}
                  onChangeText={(text) => {
                    // Only allow numbers
                    const numericValue = text.replace(/[^0-9]/g, '');
                    setWardNo(numericValue);
                  }}
                />
              </View>
            </View>
          </>
        )}

        {isLogin && (
          <TouchableOpacity style={styles.forgotBtn}>
            <Text style={styles.forgotText}>Forgot password?</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity style={styles.mainButton} onPress={handleSubmit} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.mainButtonText}>{isLogin ? "Login" : "Create Account"}</Text>}
        </TouchableOpacity>

        {!isLogin && (
          <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignup}>
            <GoogleLogo />
            <Text style={styles.googleBtnText}>Sign Up with Google</Text>
          </TouchableOpacity>
        )}

        {/* Benefits Section */}
        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>With an account, you get:</Text>
          <BenefitItem text="Personalized price & volume spike alerts" color="#70A288" />
          <BenefitItem text="Custom watchlist and portfolio tracking" color="#04395E" />
        </View>
      </View>
    </ScrollView>
  );
}

function BenefitItem({ text, color }: { text: string; color: string }) {
  return (
    <View style={styles.benefitRow}>
      <View style={[styles.dot, { backgroundColor: color }]} />
      <Text style={styles.benefitText}>{text}</Text>
    </View>
  );
}

function GoogleLogo() {
  return (
    <View style={styles.googleLogoContainer}>
      {/* Google "G" Logo with colorful design */}
      <View style={styles.googleGContainer}>
        {/* Blue section (top-left) */}
        <View style={[styles.googleGPart, styles.googleGBlue]} />
        {/* Red section (top-right) */}
        <View style={[styles.googleGPart, styles.googleGRed]} />
        {/* Yellow section (bottom-left) */}
        <View style={[styles.googleGPart, styles.googleGYellow]} />
        {/* Green section (bottom-right) */}
        <View style={[styles.googleGPart, styles.googleGGreen]} />
        {/* White "G" shape overlay */}
        <View style={styles.googleGWhite}>
          <Text style={styles.googleGText}>G</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  headerGradient: {
    backgroundColor: "#031D44",
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  backBtn: { marginBottom: 20 },
  headerContent: { gap: 8 },
  iconContainer: {
    backgroundColor: "#70A288",
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { fontSize: 14, color: "#CBD5E1" },
  formCard: { marginHorizontal: 20, marginTop: -20, padding: 20, backgroundColor: "#fff", borderRadius: 24, elevation: 4 },
  toggleContainer: { flexDirection: "row", backgroundColor: "#F1F5F9", padding: 4, borderRadius: 12, marginBottom: 20 },
  toggleBtn: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  toggleActive: { backgroundColor: "#fff" },
  toggleText: { fontSize: 14, color: "#64748B", fontWeight: "600" },
  toggleTextActive: { color: "#031D44" },
  inputBlock: { marginBottom: 16 },
  label: { fontSize: 13, fontWeight: "600", color: "#475569", marginBottom: 6 },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 50,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: "#1E293B" },
  forgotBtn: { alignSelf: "flex-end", marginBottom: 20 },
  forgotText: { color: "#04395E", fontSize: 13, fontWeight: "600" },
  mainButton: { backgroundColor: "#04395E", padding: 16, borderRadius: 12, alignItems: "center", marginTop: 10 },
  mainButtonText: { color: "#fff", fontWeight: "700", fontSize: 16 },
  googleBtn: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },
  googleLogoContainer: {
    marginRight: 10,
    width: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  googleGContainer: {
    width: 22,
    height: 22,
    borderRadius: 11,
    position: "relative",
    overflow: "hidden",
  },
  googleGPart: {
    position: "absolute",
    width: "50%",
    height: "50%",
  },
  googleGBlue: {
    top: 0,
    left: 0,
    backgroundColor: "#4285F4",
    borderTopLeftRadius: 11,
  },
  googleGRed: {
    top: 0,
    right: 0,
    backgroundColor: "#EA4335",
    borderTopRightRadius: 11,
  },
  googleGYellow: {
    bottom: 0,
    left: 0,
    backgroundColor: "#FBBC05",
    borderBottomLeftRadius: 11,
  },
  googleGGreen: {
    bottom: 0,
    right: 0,
    backgroundColor: "#34A853",
    borderBottomRightRadius: 11,
  },
  googleGWhite: {
    position: "absolute",
    width: 14,
    height: 14,
    backgroundColor: "#fff",
    borderRadius: 7,
    top: 4,
    left: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  googleGText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#4285F4",
    marginTop: -1,
  },
  googleBtnText: { fontWeight: "600", color: "#444" },
  benefitsContainer: { marginTop: 24, gap: 10 },
  benefitsTitle: { fontSize: 13, color: "#64748B", marginBottom: 4 },
  benefitRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  dot: { width: 6, height: 6, borderRadius: 3 },
  benefitText: { fontSize: 12, color: "#475569" },
  // Dashboard Styles
  navBar: { paddingTop: 60, paddingHorizontal: 20, flexDirection: "row", alignItems: "center" },
  navTitleContainer: { flex: 1 },
  navTitle: { fontSize: 22, fontWeight: "700" },
  navSubtitle: { fontSize: 14, color: "#64748B" },
  menuBtn: { padding: 6 },
  dropdown: { position: "absolute", top: 100, right: 20, backgroundColor: "#fff", borderRadius: 12, borderWidth: 1, borderColor: "#E5E7EB", elevation: 5, padding: 10 },
  dropdownItem: { flexDirection: "row", alignItems: "center", gap: 8 },
  logoutText: { color: "#EF4444", fontWeight: "600" },
});