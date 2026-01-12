import { useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function InsightsScreen() {
  const [selected, setSelected] = useState<
    "heatmap" | "sector" | "pe" | "volume"
  >("heatmap");

  const heatmapData = [
    { symbol: "NABIL", change: 2.4 },
    { symbol: "NICA", change: 3.1 },
    { symbol: "EBL", change: 1.8 },
    { symbol: "NIBL", change: -1.2 },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <Text style={styles.headerSubtitle}>Market visualization</Text>
      </View>

      {/* Chart Selector */}
      <View style={styles.selector}>
        {[
          { key: "heatmap", label: "Heat Map" },
          { key: "sector", label: "Sector" },
          { key: "pe", label: "P/E vs Div" },
          { key: "volume", label: "Volume" },
        ].map((item) => (
          <TouchableOpacity
            key={item.key}
            onPress={() => setSelected(item.key as any)}
            style={[
              styles.button,
              selected === item.key && styles.buttonActive,
            ]}
          >
            <Text
              style={[
                styles.buttonText,
                selected === item.key && styles.buttonTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      <View style={styles.card}>
        {selected === "heatmap" && (
          <View style={styles.grid}>
            {heatmapData.map((stock) => (
              <View
                key={stock.symbol}
                style={[
                  styles.stockBox,
                  {
                    backgroundColor:
                      stock.change > 0 ? "#DCFCE7" : "#FEE2E2",
                  },
                ]}
              >
                <Text style={styles.stockSymbol}>{stock.symbol}</Text>
                <Text
                  style={{
                    color: stock.change > 0 ? "#15803D" : "#B91C1C",
                    fontWeight: "bold",
                  }}
                >
                  {stock.change > 0 ? "+" : ""}
                  {stock.change}%
                </Text>
              </View>
            ))}
          </View>
        )}

        {selected !== "heatmap" && (
          <Text style={styles.placeholder}>
            Chart visualization coming soon
          </Text>
        )}
      </View>

      {/* Insight Card */}
      <View style={styles.insightCard}>
        <Text style={styles.insightTitle}>📊 Market Insight</Text>
        <Text style={styles.insightText}>
          Commercial banks dominate NEPSE, with most showing positive momentum
          this week.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },

  header: {
    backgroundColor: "#4ade80",
    padding: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerTitle: { fontSize: 24, fontWeight: "bold", color: "#fff" },
  headerSubtitle: { color: "#E9D5FF", marginTop: 4 },

  selector: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 16,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#E5E7EB",
  },
  buttonActive: {
    backgroundColor: "#8B5CF6",
  },
  buttonText: { fontSize: 12, color: "#374151" },
  buttonTextActive: { color: "#fff" },

  card: {
    backgroundColor: "#fff",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  stockBox: {
    width: "48%",
    padding: 16,
    borderRadius: 12,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },

  placeholder: {
    textAlign: "center",
    color: "#6B7280",
  },

  insightCard: {
    backgroundColor: "#EEF2FF",
    margin: 16,
    padding: 16,
    borderRadius: 16,
  },
  insightTitle: {
    fontWeight: "bold",
    marginBottom: 6,
  },
  insightText: {
    color: "#374151",
    fontSize: 13,
  },
});
