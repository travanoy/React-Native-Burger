import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Contact() {
  const router = useRouter();

  const handleBack = () => {
    router.navigate("/");
  };

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.content}>
        <Text style={styles.title}>Contact</Text>
        <Text style={styles.subtitle}>Get in touch with us!</Text>
      </View>
      <TouchableOpacity onPress={handleBack} style={styles.backButton}>
        <Text style={styles.backText}>Back</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#242329",
    paddingHorizontal: 22,
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#9A9A9D",
    fontSize: 16,
  },
  backButton: {
    backgroundColor: "#2E2D33",
    borderRadius: 999,
    paddingVertical: 14,
    alignItems: "center",
    marginBottom: 16,
  },
  backText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
