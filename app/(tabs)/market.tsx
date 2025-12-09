import { StyleSheet, Text, View } from "react-native";

export default function MarketScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Market Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 22, fontWeight: "bold" },
});
