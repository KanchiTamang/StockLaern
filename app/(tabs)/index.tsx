import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      
      {/* Header part*/}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <View style={styles.logoBox}>
            <Feather name="trending-up" size={28} color="#fff" />
          </View>
          <View>
            <Text style={styles.title}>StockLearn</Text>
            <Text style={styles.subtitle}>Learn & Grow</Text>
          </View>
        </View>
      </View>

      {/* subsection after the header Section which can be called her section */}
      <View style={styles.hero}>
        <Text style={styles.heroTitle}>Master Stock Trading</Text>
        <Text style={styles.heroDesc}>
          Learn NEPSE basics, track trends, and get real-time alerts on commercial sector stocks
        </Text>

        <Link href="/learn" asChild>
          <TouchableOpacity style={styles.btnPrimary}>
            <Text style={styles.btnPrimaryText}>Start Learning</Text>
            <Feather name="arrow-right" size={20} color="#fff" />
          </TouchableOpacity>
        </Link>

        <Link href="/market" asChild>
          <TouchableOpacity style={styles.btnSecondary}>
            <Text style={styles.btnSecondaryText}>Browse Market</Text>
          </TouchableOpacity>
        </Link>
      </View>

      {/* NEPSE Stats */}
      <View style={styles.statsCard}>
        <View style={styles.statsRow}>
          <View>
            <Text style={styles.statsLabel}>NEPSE Index</Text>
            <Text style={styles.statsValue}>2,145.67</Text>
          </View>

          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.statsPositive}>+52.34</Text>
            <Text style={styles.statsLabel}>+2.4%</Text>
          </View>
        </View>

        <View style={styles.statsDivider} />

        <View style={styles.statsGrid}>
          <StatItem label="Volume" value="12.5M" />
          <StatItem label="Turnover" value="3.2B" />
          <StatItem label="Companies" value="234" />
        </View>
      </View>

      {/* Features */}
      <Text style={styles.sectionTitle}>Explore Features</Text>

      <FeatureCard
        icon="book-open"
        title="Beginner Guide"
        desc="Bite-sized lessons to learn basics"
        link="/learn"
        colors={["#60A5FA", "#22D3EE"]}
      />

      <FeatureCard
        icon="trending-up"
        title="Browse Market"
        desc="Real-time NEPSE data & insights"
        link="/market"
        colors={["#A78BFA", "#F472B6"]}
      />

      <FeatureCard
        icon="bar-chart-2"
        title="Visual Insights"
        desc="Charts, heatmaps & analytics"
        link="/insights"
        colors={["#4ADE80", "#2DD4BF"]}
      />

    </ScrollView>
  );
}

/* ------------------ COMPONENTS ------------------- */

function FeatureCard({ icon, title, desc, link, colors }:any) {
  return (
    <Link href={link} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={[styles.iconBox, { backgroundColor: colors[0] }]}>
          <Feather name={icon} size={28} color="#fff" />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDesc}>{desc}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <View>
      <Text style={styles.statsLabel}>{label}</Text>
      <Text style={styles.statsValueSmall}>{value}</Text>
    </View>
  );
}

/* ------------------ STYLES ------------------- */

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff"
  },
  headerLeft: { flexDirection: "row", gap: 12, alignItems: "center" },

  logoBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: "#6366F1",
    justifyContent: "center",
    alignItems: "center",
  },

  title: { fontSize: 18, fontWeight: "600" },
  subtitle: { fontSize: 12, color: "#666" },

  hero: { padding: 20, alignItems: "center" },
  heroTitle: { fontSize: 24, fontWeight: "700", marginBottom: 6 },
  heroDesc: { textAlign: "center", color: "#555", marginBottom: 16 },

  btnPrimary: {
    width: "100%",
    backgroundColor: "#4F46E5",
    padding: 14,
    borderRadius: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginBottom: 10
  },
  btnPrimaryText: { color: "#fff", fontSize: 16 },

  btnSecondary: {
    width: "100%",
    padding: 14,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#ddd",
    alignItems: "center",
  },
  btnSecondaryText: { fontSize: 16, color: "#333" },

  statsCard: {
    margin: 20,
    backgroundColor: "#6366F1",
    padding: 20,
    borderRadius: 20,
  },

  statsRow: { flexDirection: "row", justifyContent: "space-between" },
  statsLabel: { color: "#Dbeafe" },
  statsValue: { color: "#fff", fontSize: 32, fontWeight: "700" },
  statsPositive: { color: "#A7F3D0", fontSize: 16 },

  statsDivider: {
    marginVertical: 12,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
  },

  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statsValueSmall: { color: "#fff", fontSize: 16 },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 12,
  },

  iconBox: {
    width: 60,
    height: 60,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  cardTitle: { fontSize: 16, fontWeight: "600" },
  cardDesc: { color: "#555" },
});
