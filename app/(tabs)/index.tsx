import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      {/* Header */}
      <View style={styles.header}>
        <LinearGradient
          colors={["#06B6D4", "#22C55E"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoBox}
        >
          <Feather name="trending-up" size={26} color="#fff" />
        </LinearGradient>

        <Text style={styles.title}>Stock Learn</Text>
        <Text style={styles.subtitle}>
          Your beginner-friendly platform to learn about the stock market, track
          NEPSE data, and stay informed with intelligent alerts.
        </Text>
      </View>

      {/* Market Overview */}
      <LinearGradient
        colors={["#0EA5E9", "#22C55E"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.marketCard}
      >
        <View style={styles.marketTop}>
          <View>
            <Text style={styles.marketLabel}>NEPSE Index</Text>
            <Text style={styles.marketValue}>2,156.42</Text>
          </View>

          <View style={styles.marketIcon}>
            <Feather name="trending-up" size={22} color="#fff" />
          </View>
        </View>

        <View style={styles.marketBottom}>
          <View style={styles.percentBadge}>
            <Text style={styles.percentText}>+2.4%</Text>
          </View>
          <Text style={styles.marketSub}>+51.24 points today</Text>
        </View>
      </LinearGradient>

      {/* Quick Actions */}
      <Text style={styles.sectionTitle}>Quick Actions</Text>

      <QuickAction
        icon="book-open"
        title="Beginner Guide"
        desc="Learn stock market basics"
        link="/learn"
        bg="#DBEAFE"
        color="#2563EB"
      />

      <QuickAction
        icon="trending-up"
        title="Browse Market"
        desc="Explore NEPSE companies"
        link="/market"
        bg="#DCFCE7"
        color="#16A34A"
      />

      <QuickAction
        icon="bar-chart-2"
        title="Visual Insights"
        desc="Charts & market analysis"
        link="/insights"
        bg="#F3E8FF"
        color="#7C3AED"
      />

      {/* 🔔 Alert CTA (MISSING PART – NOW ADDED) */}
      <View style={styles.alertCard}>
        <View style={styles.alertIcon}>
          <Feather name="bell" size={20} color="#D97706" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.alertTitle}>Stay Updated</Text>
          <Text style={styles.alertDesc}>
            Get alerts for price changes, volume spikes, and market trends
          </Text>

          <Link href="/(tabs)/profile" asChild>
            <Text style={styles.alertLink}>Sign up for alerts →</Text>
          </Link>
        </View>
      </View>

      {/* 💡 Beginner Tip (MISSING PART – NOW ADDED) */}
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>💡 Beginner Tip</Text>
        <Text style={styles.tipDesc}>
          Start by learning what stocks are and how the NEPSE market works. Check
          out our Beginner Guide!
        </Text>
      </View>
    </ScrollView>
  );
}

/* ---------------- COMPONENT ---------------- */

function QuickAction({ icon, title, desc, link, bg, color }: any) {
  return (
    <Link href={link} asChild>
      <TouchableOpacity style={styles.actionCard}>
        <View style={[styles.actionIcon, { backgroundColor: bg }]}>
          <Feather name={icon} size={20} color={color} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.actionTitle}>{title}</Text>
          <Text style={styles.actionDesc}>{desc}</Text>
        </View>

        <Feather name="arrow-right" size={20} color="#9CA3AF" />
      </TouchableOpacity>
    </Link>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: { backgroundColor: "#FFFFFF" },

  header: { marginBottom: 24 },

  logoBox: {
    width: 56,
    height: 56,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  title: { fontSize: 28, fontWeight: "700", color: "#0F172A" },

  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: "#64748B",
    lineHeight: 22,
  },

  marketCard: { borderRadius: 20, padding: 20, marginBottom: 24 },

  marketTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  marketLabel: { color: "#E0F2FE", fontSize: 13 },

  marketValue: { color: "#fff", fontSize: 32, fontWeight: "700" },

  marketIcon: {
    backgroundColor: "rgba(255,255,255,0.25)",
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  marketBottom: { flexDirection: "row", alignItems: "center", gap: 10 },

  percentBadge: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },

  percentText: { color: "#fff", fontSize: 12, fontWeight: "600" },

  marketSub: { color: "#E0F2FE", fontSize: 13 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 12,
  },

  actionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 12,
  },

  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  actionTitle: { fontSize: 16, fontWeight: "600", color: "#0F172A" },

  actionDesc: { fontSize: 13, color: "#64748B" },

  /* Alert */
  alertCard: {
    flexDirection: "row",
    backgroundColor: "#FFFBEB",
    borderWidth: 1,
    borderColor: "#FDE68A",
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    gap: 12,
  },

  alertIcon: {
    backgroundColor: "#FEF3C7",
    padding: 10,
    borderRadius: 12,
  },

  alertTitle: { fontWeight: "600", color: "#0F172A" },

  alertDesc: {
    fontSize: 13,
    color: "#64748B",
    marginVertical: 6,
  },

  alertLink: { color: "#2563EB", fontSize: 13, fontWeight: "500" },

  /* Tip */
  tipCard: {
    backgroundColor: "#FDF4FF",
    borderWidth: 1,
    borderColor: "#F5D0FE",
    borderRadius: 16,
    padding: 16,
    marginTop: 16,
    marginBottom: 40,
  },

  tipTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#7C3AED",
    marginBottom: 4,
  },

  tipDesc: { fontSize: 13, color: "#374151" },
});
