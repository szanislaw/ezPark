import { View, Text, StyleSheet } from "react-native";

function FavCard({ favs }) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{favs.car_park_no}</Text>
        <Text style={styles.text}>
          Description:{" "}
          <Text style={styles.boldText} numberOfLines={2}>
            {favs.address}
          </Text>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderWidth: 0.2,
    padding: 20,
    shadowOffset: { width: 0, height: 2 },
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    maxWidth: 400,
    width: 200,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontFamily: "OpenSans_700Bold",
    marginBottom: 5,
    textAlign: "center",
    color: "#444444",
  },
  text: {
    fontSize: 14,
    marginBottom: 5,
    color: "#444444",
    fontFamily: "OpenSans_400Regular",
  },
});

export default FavCard;
