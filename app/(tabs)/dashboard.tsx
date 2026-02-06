import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function DashboardScreen() {
  const router = useRouter();
  const [spikeAlertsEnabled, setSpikeAlertsEnabled] = useState(true);
  const [userName] = useState("Username"); // yp pachi  auth state bata aucha, for now username hardcoded

  const stockAlerts = [
    {
      symbol: "SJCL",
      type: "greater than",
      price: "200.0",
      units: "> 100",
      status: "active",
    },
  ];

  const watchlistItems = [
    {
      symbol: "NABIL",
      price: "NPR 1245.00",
      change: "+2.4%",
      alertType: "Alert: Price Jump",
      isPositive: true,
    },
    {
      symbol: "NICA",
      price: "NPR 1034.00",
      change: "+3.1%",
      alertType: "Alert: Volume Spike",
      isPositive: true,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {/* Header Section */}
      <LinearGradient
        colors={["#8B5CF6", "#3B82F6"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.headerGradient}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Feather name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Welcome, {userName}!</Text>
          <Text style={styles.headerSubtitle}>Track your portfolio and market alerts</Text>
        </View>
        <TouchableOpacity style={styles.logoutBtn}>
          <Text style={styles.logoutBtnText}>Logout</Text>
          <Feather name="arrow-right" size={16} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      
      {/* Spike Alerts Section */}
      <View style={styles.alertCard}>
        <View style={styles.alertHeader}>
          <View style={styles.alertTitleRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.alertBackBtn}>
              <Feather name="arrow-left" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.alertCardTitle}>Stock Alerts</Text>
            <View style={{ width: 20 }} />
          </View>
          <Switch
            value={spikeAlertsEnabled}
            onValueChange={setSpikeAlertsEnabled}
            trackColor={{ false: "#E5E7EB", true: "#22c55e" }}
            thumbColor="#fff"
          />
        </View>

        {/* Table Header */}
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>SYMBOL</Text>
          <Text style={styles.tableHeaderText}>TYPE</Text>
          <Text style={styles.tableHeaderText}>PRICE</Text>
          <Text style={styles.tableHeaderText}>UNITS</Text>
          <Text style={styles.tableHeaderText}>STATUS</Text>
        </View>

        
        {/* Alert Entries */}
        {stockAlerts.length > 0 ? (
          stockAlerts.map((alert, index) => (
            <View key={index} style={styles.alertRow}>
              <Text style={styles.alertRowText}>{alert.symbol}</Text>
              <Text style={styles.alertRowText}>{alert.type}</Text>
              <Text style={styles.alertRowText}>{alert.price}</Text>
              <Text style={styles.alertRowText}>{alert.units}</Text>
              <View style={styles.statusIcon}>
                <Feather name="bell" size={16} color="#22c55e" />
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyAlerts}>
            <Text style={styles.emptyAlertsText}>No alerts configured</Text>
          </View>
        )}

        
        {/* Add Alert Button */}
        <TouchableOpacity
          style={styles.addAlertButton}
          onPress={() => router.push("/(tabs)/alert-settings")}
        >
          <Feather name="plus" size={18} color="#fff" style={{ marginRight: 8 }} />
          <Text style={styles.addAlertButtonText}>ADD STOCK ALERT</Text>
        </TouchableOpacity>
      </View>

      {/* My Watchlist Section */}
      
      <View style={styles.watchlistSection}>
        <View style={styles.watchlistHeader}>
          <Text style={styles.watchlistTitle}>My Watchlist</Text>
          <TouchableOpacity>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>

        {watchlistItems.map((item, index) => (
          <View key={index} style={styles.watchlistCard}>
            <View style={styles.watchlistCardContent}>
              <View style={styles.watchlistLeft}>
                <Text style={styles.stockSymbol}>{item.symbol}</Text>
                <View style={styles.alertBadge}>
                  <Text style={styles.alertBadgeText}>{item.alertType}</Text>
                </View>
              </View>
              <View style={styles.watchlistRight}>
                <Text style={styles.stockPrice}>{item.price}</Text>
                <Text style={[styles.stockChange, { color: item.isPositive ? "#10B981" : "#EF4444" }]}>
                  {item.change}
                </Text>
              </View>
            </View>
            <View style={styles.watchlistActions}>
              <TouchableOpacity style={styles.viewDetailsBtn}>
                <Feather name="eye" size={16} color="#64748B" />
                <Text style={styles.viewDetailsText}>View Details</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.setAlertBtn}>
                <Feather name="settings" size={16} color="#3B82F6" />
                <Text style={styles.setAlertText}>Set Alert</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  headerGradient: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: "#031D44",
  },
  backBtn: {
    marginBottom: 20,
  },
  headerContent: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#E0E7FF",
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
  },
  logoutBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
  alertCard: {
    marginHorizontal: 20,
    marginTop: -20,
    backgroundColor: "#fff",
    borderRadius: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    overflow: "hidden",
  },
  alertHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#70A288",
  },
  alertTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  alertBackBtn: {
    marginRight: 12,
  },
  alertCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#fff",
    flex: 1,
    textAlign: "center",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#D4E8DD",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E2E8F0",
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 11,
    fontWeight: "700",
    color: "#1E293B",
    textAlign: "center",
  },
  alertRow: {
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
    alignItems: "center",
  },
  alertRowText: {
    flex: 1,
    fontSize: 13,
    color: "#1E293B",
    textAlign: "center",
  },
  statusIcon: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyAlerts: {
    padding: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyAlertsText: {
    fontSize: 14,
    color: "#64748B",
  },
  addAlertButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#70A288",
    paddingVertical: 14,
    paddingHorizontal: 20,
    margin: 16,
    borderRadius: 12,
  },
  addAlertButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  watchlistSection: {
    marginTop: 24,
    paddingHorizontal: 20,
  },
  watchlistHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  watchlistTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
  },
  editText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#04395E",
  },
  watchlistCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  watchlistCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  watchlistLeft: {
    flex: 1,
  },
  stockSymbol: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1E293B",
    marginBottom: 8,
  },
  alertBadge: {
    alignSelf: "flex-start",
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  alertBadgeText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#92400E",
  },
  watchlistRight: {
    alignItems: "flex-end",
  },
  stockPrice: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  stockChange: {
    fontSize: 14,
    fontWeight: "600",
  },
  watchlistActions: {
    flexDirection: "row",
    gap: 12,
  },
  viewDetailsBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    gap: 6,
  },
  viewDetailsText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#64748B",
  },
  setAlertBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#D4E8DD",
    borderRadius: 10,
    gap: 6,
  },
  setAlertText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#70A288",
  },
});
