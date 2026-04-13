import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../constants/theme";

const CURRENCIES = {
  USD: { name: "United States Dollar", flag: "US", symbol: "$" },
  EUR: { name: "Euro Member Countries", flag: "EU", symbol: "€" },
};

// Static mock rate
const RATE = 0.9192;

export default function CurrencyConverter() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const [inputValue, setInputValue] = useState("1240.00");
  const [from, setFrom] = useState<"USD" | "EUR">("USD");

  const toggleDirection = () => {
    setFrom(prev => prev === "USD" ? "EUR" : "USD");
  };

  const handlePress = (key: string) => {
    if (key === "backspace") {
      setInputValue((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
      return;
    }
    if (key === "." && inputValue.includes(".")) return;
    
    setInputValue((prev) => {
      if (prev === "0" && key !== ".") return key;
      return prev + key;
    });
  };

  const result = (() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "0.00";
    const res = from === "USD" ? num * RATE : num / RATE;
    return res.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  })();

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"];

  // Logic to determine base and target based on 'from'
  const baseCurrency = from === "USD" ? CURRENCIES.USD : CURRENCIES.EUR;
  const targetCurrency = from === "USD" ? CURRENCIES.EUR : CURRENCIES.USD;
  const displayInput = parseFloat(inputValue || "0").toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerLeft}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
            <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.titleSection}>
          <Text style={styles.labelSmall}>Financial Tools</Text>
          <Text style={styles.screenTitle}>Currency Converter</Text>
        </View>

        <View style={styles.mainCard}>
          {/* Base */}
          <View style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <View style={styles.flagPlaceholder}>
                <Text style={styles.flagText}>{baseCurrency.flag}</Text>
              </View>
              <View>
                <Text style={styles.currencyCode}>{from}</Text>
                <Text style={styles.currencyName}>{baseCurrency.name}</Text>
              </View>
            </View>
            <Text style={styles.amountDisplay} adjustsFontSizeToFit numberOfLines={1}>
              {displayInput}
            </Text>
          </View>

          {/* Swap Divider */}
          <View style={styles.swapDivider}>
            <View style={styles.dividerLine} />
            <TouchableOpacity style={styles.swapButton} onPress={toggleDirection} activeOpacity={0.8}>
              <MaterialIcons name="swap-vert" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Target */}
          <View style={styles.currencyRow}>
            <View style={styles.currencyInfo}>
              <View style={styles.flagPlaceholder}>
                <Text style={styles.flagText}>{targetCurrency.flag}</Text>
              </View>
              <View>
                <Text style={[styles.currencyCode, { color: theme.colors.primary }]}>
                  {from === "USD" ? "EUR" : "USD"}
                </Text>
                <Text style={styles.currencyName}>{targetCurrency.name}</Text>
              </View>
            </View>
            <Text style={[styles.amountDisplay, { color: theme.colors.primary }]} adjustsFontSizeToFit numberOfLines={1}>
              {result}
            </Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statsCard}>
            <View>
              <Text style={styles.statsLabel}>Rate (1 USD)</Text>
              <Text style={styles.statsValue}>0.9192 EUR</Text>
            </View>
            <View style={styles.trendRow}>
              <MaterialIcons name="trending-up" size={14} color={theme.colors.primary} />
              <Text style={styles.trendText}>+0.24% today</Text>
            </View>
          </View>
          <View style={styles.statsCard}>
            <Text style={styles.statsLabel}>7D History</Text>
            <View style={styles.sparkline}>
              {/* Fake bars */}
              <View style={[styles.bar, { height: "40%" }]} />
              <View style={[styles.bar, { height: "55%" }]} />
              <View style={[styles.bar, { height: "45%" }]} />
              <View style={[styles.bar, { height: "70%" }]} />
              <View style={[styles.barPrimary, { height: "85%" }]} />
              <View style={[styles.barPrimaryDim, { height: "100%" }]} />
              <View style={[styles.barPrimary, { height: "90%" }]} />
            </View>
          </View>
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {keys.map((k) => (
            <TouchableOpacity
              key={k}
              style={styles.key}
              onPress={() => handlePress(k)}
              activeOpacity={0.7}
            >
              {k === "backspace" ? (
                <MaterialIcons name="backspace" size={24} color={theme.colors["on-surface"]} />
              ) : (
                <Text style={styles.keyText}>{k}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>Convert Now</Text>
        </TouchableOpacity>
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
  content: {
    padding: 24,
    maxWidth: 672,
    alignSelf: "center",
    width: "100%",
    gap: 32,
    paddingBottom: 48,
  },
  titleSection: {
    gap: 4,
  },
  labelSmall: {
    fontSize: 12,
    fontWeight: "bold",
    color: theme.colors.primary,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    opacity: 0.8,
  },
  screenTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: -0.5,
  },
  mainCard: {
    backgroundColor: theme.colors["surface-container-low"],
    borderRadius: 16,
    padding: 24,
    gap: 32,
  },
  currencyRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  currencyInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  flagPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 },
      android: { elevation: 1 },
    }),
  },
  flagText: {
    fontSize: 16,
    fontWeight: "bold",
    color: theme.colors["on-surface-variant"],
  },
  currencyCode: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors["on-surface-variant"],
    letterSpacing: 1,
  },
  currencyName: {
    fontSize: 12,
    color: theme.colors.outline,
  },
  amountDisplay: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: -1,
    flex: 1,
    textAlign: "right",
    marginLeft: 16,
  },
  swapDivider: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: -16,
    zIndex: 10,
  },
  dividerLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: "rgba(179, 177, 177, 0.15)",
  },
  swapButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
  },
  statsGrid: {
    flexDirection: "row",
    gap: 16,
  },
  statsCard: {
    flex: 1,
    backgroundColor: theme.colors["surface-container-lowest"],
    borderColor: "rgba(179, 177, 177, 0.15)",
    borderWidth: 1,
    padding: 20,
    borderRadius: 16,
    height: 128,
    justifyContent: "space-between",
  },
  statsLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors.outline,
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
  statsValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
    marginTop: 4,
  },
  trendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  trendText: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  sparkline: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 4,
    paddingTop: 8,
    paddingHorizontal: 4,
  },
  bar: {
    flex: 1,
    backgroundColor: theme.colors["surface-container-high"],
    borderRadius: 999,
  },
  barPrimary: {
    flex: 1,
    backgroundColor: theme.colors.primary,
    borderRadius: 999,
  },
  barPrimaryDim: {
    flex: 1,
    backgroundColor: theme.colors["primary-dim"],
    borderRadius: 999,
  },
  keypad: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  key: {
    width: "30%",
    height: 64,
    backgroundColor: theme.colors["surface-container-lowest"],
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  keyText: {
    fontSize: 20,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
  },
  actionButton: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: theme.colors.primary,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 1.5,
  },
});
