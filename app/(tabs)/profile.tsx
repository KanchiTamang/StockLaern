import { StyleSheet, Text, View } from "react-native";


export default function profile() {
  return (
    <View
    style={styles.container}

      
    >
      <Text >profile section</Text>
    </View>
  );
}
const styles= StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
    fontSize: 22,
    
    
  },
});


