import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface MenuItemProps {
  id: number;
  title: string;
  category: string;
  rating: number; 
  price: number;
  image: any;
}

export default function BurgerMenuItem({ item}: { item: MenuItemProps;}) {
  return (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} contentFit="contain" />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
        <View style={styles.ratingRow}>
          {[...Array(5)].map((_, index) => (
            <Ionicons
              key={index}
              name={index < Math.floor(item.rating) ? "star" : "star-outline"}
              size={14}
              style={styles.star}
            />
          ))}
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{item.category}</Text>
          </View>
            <Text style={styles.price}>Rs {item.price.toFixed(2)}</Text>
        </View>
      </View>     
      <Pressable style={styles.addButton}>
        <Ionicons name="add" size={24} color="#FFFFFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#2E2C34",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginBottom: 14,
    overflow: "hidden",
  },
  image: {
    width: 95,
    height: 77,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
    justifyContent: "center",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4,
  },
  ratingRow: {
    flexDirection: "row",
    marginBottom: 6,
  },
  star: {
    color: "#F6B245",
    marginRight: 2,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  badge: {
    backgroundColor: "#CF2A2A1A",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  badgeText: {
    color: "#C4C4C6",
    fontSize: 11,
    fontWeight: "500",
  },
  price: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
    marginRight: 3,
  },
  addButton: {
    backgroundColor: "#CF2A2A26",
    width: 50,
    alignSelf: "stretch", 
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    margin: -12, 
    marginLeft: 0,
  },
});