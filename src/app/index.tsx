import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categories, burger } from "@/mock/burger";
import BurgerCard, { BurgerCardProps } from "@/components/main/ui/burger-card";
import { Link, Redirect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import BurgerMenuItem from "@/components/main/ui/burgerMenu-card";

export default function Index() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
    const [user, setUser] = useState<{ name?: string; email?: string } | null>(null);

    useEffect(() => {
        let cancelled = false;

        const loadAuth = async () => {
            const stored = await AsyncStorage.getItem("isLoggedIn");
            const storedUser = await AsyncStorage.getItem("user");
            if (cancelled) return;
            setIsLoggedIn(stored === "true");
            setUser(storedUser ? JSON.parse(storedUser) : {});
        };

        loadAuth();

        return () => {
            cancelled = true;
        };
    }, []);

    if (isLoggedIn === null || user === null) {
        return <View style={styles.container} />;
    }

    if (!isLoggedIn) {
        return <Redirect href="/launch" />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                
                <View style={styles.header}>
                    <Ionicons name="menu-outline" size={24} color="white" />
                    <View style={styles.headerContent}>
                        {user.email ? (
                            <View style={styles.userEmailContainer}>
                                <Text style={styles.userEmail}>{user.email.slice(0, 1).toUpperCase()}</Text>
                            </View>
                        ) : (
                            <Image
                                source={{ uri: "https://img.magnific.com/free-psd/3d-illustration-with-online-avatar_23-2151303097.jpg?semt=ais_hybrid&w=740&q=80" }}
                                style={styles.burgerImage}
                                contentFit="contain"
                            />
                        )}
                        <Ionicons name="notifications-outline" size={24} color="white" />
                    </View>
                </View>

                
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Beyond Just Burgers</Text>
                    <Text style={styles.subtitle}>It’s a Taste Revolution!</Text>
                </View>

                
                <ScrollView
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.categoryContainer}
                >
                    {categories.map((category, index) => (
                        <Pressable key={category.id} style={styles.categoryItem}>
                            <Text style={[styles.categoryText, index === 0 && styles.activeCategoryText]}>
                                {category.title}
                            </Text>
                        </Pressable>
                    ))}
                </ScrollView>

                
                <FlatList
                    data={burger}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.burgersContainer}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: BurgerCardProps }) => (
                        <Link href={`/burger/${item.id}/page`} asChild>
                            <Pressable>
                                <BurgerCard item={item} />
                            </Pressable>
                        </Link>
                    )}
                />

                
                <View style={styles.menuHeaderRow}>
                    <Text style={styles.menuTitle}>Menu</Text>
                    <Text style={styles.seeAllText}>See all</Text>
                </View>

                
                <FlatList 
                    data={burger}
                    scrollEnabled={false} 
                    contentContainerStyle={styles.menuListContainer}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }: { item: any }) => (
                        <Link href={`/burger/${item.id}/page`} asChild>
                            <Pressable>
                                <BurgerMenuItem 
                                    item={{
                                        ...item,
                                        name: item.title,
                                        id: String(item.id)
                                    }} 
                                />
                            </Pressable>
                        </Link>
                    )}
                />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#242329",
    },
    scrollContent: {
        paddingHorizontal: 16,
        paddingBottom: 40,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 10,
    },
    headerContent: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
    },
    burgerImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    userEmailContainer: {
        backgroundColor: "#3A3940",
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    userEmail: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
        textTransform: "uppercase",
    },
    titleContainer: {
        marginVertical: 16,
    },
    title: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    subtitle: {
        color: "#9A9A9D",
        fontSize: 15,
        fontWeight: "400",
        marginTop: 4,
    },
    categoryContainer: {
        gap: 24,
        paddingVertical: 10,
        alignItems: "center",
    },
    categoryItem: {
        paddingVertical: 4,
    },
    categoryText: {
        color: "#9A9A9D",
        fontSize: 16,
        fontWeight: "600",
    },
    activeCategoryText: {
        color: "#FF4B3A", 
    },
    burgersContainer: {
        gap: 14,
        paddingVertical: 12,
    },
    menuHeaderRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 12,
    },
    menuTitle: {
        color: "#FFFFFF",
        fontSize: 20,
        fontWeight: "700",
    },
    seeAllText: {
        color: "#9A9A9D",
        fontSize: 14,
        fontWeight: "500",
    },
    menuListContainer: {
        gap: 12,
    },
});