import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

export default function Dashboard() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialIcons name="grid-view" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>UTILITY</Text>
        </View>
        <View style={styles.avatarContainer}>
          <MaterialIcons name="person" size={20} color={theme.colors["on-surface"]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
        {/* Hero Area */}
        <View style={styles.heroSection}>
          <Text style={styles.heroGreeting}>Good Morning</Text>
          <Text style={styles.heroSubtitle}>What do you need to calculate today?</Text>
          
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={24} color={theme.colors["on-surface-variant"]} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for tools, units, or clocks..."
              placeholderTextColor="rgba(95, 95, 95, 0.6)"
            />
          </View>
        </View>

        {/* Categories Grid */}
        <View style={styles.gridContainer}>
          {/* Unit Converter -> spans 2 cols */}
          <TouchableOpacity
            style={[styles.card, styles.colSpan2, { backgroundColor: theme.colors["surface-container-lowest"] }]}
            onPress={() => router.push("/converter")}
            activeOpacity={0.8}
          >
            <View style={styles.cardHeader}>
              <View style={[styles.iconBg, { backgroundColor: "rgba(72, 63, 240, 0.1)" }]}>
                <MaterialIcons name="sync-alt" size={24} color={theme.colors.primary} />
              </View>
              <Text style={styles.featuredLabel}>MOST USED</Text>
            </View>
            <View>
              <Text style={styles.cardTitle}>Unit Converter</Text>
              <Text style={styles.cardSubtitle}>Weight, Length, Temp & more</Text>
            </View>
          </TouchableOpacity>

          {/* Currency */}
          <TouchableOpacity
            style={[styles.card, styles.squareCard, { backgroundColor: theme.colors["surface-container-lowest"] }]}
            onPress={() => router.push("/currency")}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBg, { backgroundColor: theme.colors["surface-container"] }]}>
              <MaterialIcons name="payments" size={24} color={theme.colors.secondary} />
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.cardTitle}>Currency</Text>
              <Text style={styles.cardSubtitle}>Real-time rates</Text>
            </View>
          </TouchableOpacity>

          {/* Calculator */}
          <TouchableOpacity
            style={[styles.card, styles.squareCard, { backgroundColor: theme.colors["surface-container-lowest"] }]}
            onPress={() => router.push("/calculator")}
            activeOpacity={0.8}
          >
            <View style={[styles.iconBg, { backgroundColor: theme.colors["surface-container"] }]}>
              <MaterialIcons name="calculate" size={24} color={theme.colors.secondary} />
            </View>
            <View style={styles.cardBottom}>
              <Text style={styles.cardTitle}>Calculator</Text>
              <Text style={styles.cardSubtitle}>Scientific & basic</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Quick Glance */}
        <View style={styles.quickGlanceSection}>
          <View style={styles.quickGlanceHeader}>
            <Text style={styles.quickGlanceLabel}>ACTIVE MEASUREMENTS</Text>
            <TouchableOpacity>
              <Text style={styles.clearAll}>CLEAR ALL</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={[styles.historyIconBg, { backgroundColor: "rgba(72, 63, 240, 0.05)" }]}>
                <MaterialIcons name="history" size={20} color={theme.colors.primary} />
              </View>
              <View>
                <Text style={styles.historyTitle}>150 Pounds to Kilograms</Text>
                <Text style={styles.historySubtitle}>Converted 10m ago</Text>
              </View>
            </View>
            <Text style={styles.historyResult}>68.03 kg</Text>
          </View>

          <View style={styles.historyItem}>
            <View style={styles.historyLeft}>
              <View style={[styles.historyIconBg, { backgroundColor: theme.colors["surface-container"] }]}>
                <MaterialIcons name="history" size={20} color={theme.colors.secondary} />
              </View>
              <View>
                <Text style={styles.historyTitle}>USD to EUR</Text>
                <Text style={styles.historySubtitle}>1.00 USD = 0.92 EUR</Text>
              </View>
            </View>
            <MaterialIcons name="star" size={20} color="rgba(95, 95, 95, 0.4)" />
          </View>
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
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  iconButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: 1,
  },
  avatarContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors["surface-container-high"],
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    padding: 24,
  },
  heroSection: {
    marginBottom: 40,
  },
  heroGreeting: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    color: theme.colors["on-surface-variant"],
    marginBottom: 32,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors["surface-container"],
    borderRadius: 12,
    height: 56,
    paddingHorizontal: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: theme.colors["on-surface"],
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 48,
  },
  card: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
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
  colSpan2: {
    width: "100%",
    height: 192,
    justifyContent: "space-between",
  },
  squareCard: {
    width: "47%",
    aspectRatio: 1,
    justifyContent: "space-between",
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  iconBg: {
    padding: 12,
    borderRadius: 12,
    alignSelf: "flex-start",
  },
  featuredLabel: {
    fontSize: 10,
    fontWeight: "800",
    color: theme.colors.primary,
    letterSpacing: 1.5,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    color: theme.colors["on-surface-variant"],
    lineHeight: 18,
  },
  cardBottom: {
    marginTop: "auto",
  },
  quickGlanceSection: {
    marginBottom: 24,
  },
  quickGlanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  quickGlanceLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: theme.colors["on-surface-variant"],
    letterSpacing: 1.5,
  },
  clearAll: {
    fontSize: 12,
    fontWeight: "800",
    color: theme.colors.primary,
    letterSpacing: 1.5,
  },
  historyItem: {
    backgroundColor: theme.colors["surface-container-lowest"],
    padding: 20,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  historyLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  historyIconBg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors["on-surface"],
    marginBottom: 4,
  },
  historySubtitle: {
    fontSize: 12,
    color: theme.colors["on-surface-variant"],
  },
  historyResult: {
    fontSize: 14,
    fontWeight: "800",
    color: theme.colors["on-surface"],
  },
});
