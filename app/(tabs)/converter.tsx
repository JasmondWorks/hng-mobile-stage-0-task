import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

const CATEGORIES = [
  { id: "length", title: "Length", desc: "Metric & Imperial units", icon: "straighten", bg: theme.colors["primary-container"], color: theme.colors.primary },
  { id: "temperature", title: "Temperature", desc: "Celsius, Fahrenheit, Kelvin", icon: "thermostat", bg: theme.colors["surface-container"], color: theme.colors["on-surface"] },
  { id: "weight", title: "Weight", desc: "Kilograms to Pounds & more", icon: "monitor-weight", bg: theme.colors["surface-container"], color: theme.colors["on-surface"] },
  { id: "area", title: "Area", desc: "Spatial measurements", icon: "square-foot", bg: theme.colors["surface-container"], color: theme.colors["on-surface"] },
  { id: "volume", title: "Volume", desc: "Liquid and dry measures", icon: "water-drop", bg: theme.colors["surface-container"], color: theme.colors["on-surface"] },
  { id: "speed", title: "Speed", desc: "Velocity and acceleration", icon: "speed", bg: theme.colors["surface-container"], color: theme.colors["on-surface"] },
];

export default function ConverterCategories() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Unit Converter</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 120 }]}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Choose a{"\n"}Dimension</Text>
          <Text style={styles.heroSubtitle}>6 PRECISION MODULES AVAILABLE</Text>
        </View>

        <View style={styles.categoriesList}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.8}
              onPress={() => router.push(`/converter/${cat.id}`)}
            >
              <View style={styles.cardLeft}>
                <View style={[styles.iconBg, { backgroundColor: cat.bg }]}>
                  <MaterialIcons name={cat.icon as any} size={24} color={cat.color} />
                </View>
                <View>
                  <Text style={styles.cardTitle}>{cat.title}</Text>
                  <Text style={styles.cardDesc}>{cat.desc}</Text>
                </View>
              </View>
              <MaterialIcons name="chevron-right" size={24} color={theme.colors.outline} />
            </TouchableOpacity>
          ))}
        </View>

        {/* Decorative Element */}
        <View style={styles.decorativeBanner}>
          <Text style={styles.decorativeText}>ENGINEERED FOR ACCURACY</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 24,
    paddingBottom: 16,
    backgroundColor: "rgba(252, 249, 248, 0.8)",
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
  },
  content: {
    padding: 24,
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
  },
  heroSection: {
    marginBottom: 48,
  },
  heroTitle: {
    fontSize: 40,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    lineHeight: 48,
    letterSpacing: -1,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors["on-surface-variant"],
    letterSpacing: 1.5,
  },
  categoriesList: {
    gap: 16,
  },
  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.colors["surface-container-lowest"],
    padding: 24,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: "#323232",
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.03,
        shadowRadius: 32,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  cardLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  iconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: theme.colors["on-surface"],
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: theme.colors["on-surface-variant"],
  },
  decorativeBanner: {
    marginTop: 48,
    height: 192,
    borderRadius: 24,
    backgroundColor: "rgba(72, 63, 240, 0.05)",
    justifyContent: "center",
    alignItems: "center",
  },
  decorativeText: {
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 2,
    color: theme.colors["on-surface-variant"],
    opacity: 0.6,
  },
});
