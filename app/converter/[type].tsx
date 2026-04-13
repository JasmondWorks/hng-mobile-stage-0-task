import React, { useState, useMemo } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

const CONVERSION_DATA: Record<string, any> = {
  length: {
    title: "Length Converter",
    units: ["Meters", "Feet"],
    convert: (val: number, from: string, to: string) => {
      if (from === to) return val;
      if (from === "Meters" && to === "Feet") return val * 3.28084;
      if (from === "Feet" && to === "Meters") return val / 3.28084;
      return val;
    },
    symbols: { Meters: "m", Feet: "ft" },
  },
  temperature: {
    title: "Temperature Converter",
    units: ["Celsius", "Fahrenheit"],
    convert: (val: number, from: string, to: string) => {
      if (from === to) return val;
      if (from === "Celsius" && to === "Fahrenheit") return (val * 9) / 5 + 32;
      if (from === "Fahrenheit" && to === "Celsius") return ((val - 32) * 5) / 9;
      return val;
    },
    symbols: { Celsius: "°C", Fahrenheit: "°F" },
  },
  weight: {
    title: "Weight Converter",
    units: ["Kilograms", "Pounds"],
    convert: (val: number, from: string, to: string) => {
      if (from === to) return val;
      if (from === "Kilograms" && to === "Pounds") return val * 2.20462;
      if (from === "Pounds" && to === "Kilograms") return val / 2.20462;
      return val;
    },
    symbols: { Kilograms: "kg", Pounds: "lbs" },
  },
};

export default function ConverterTypeScreen() {
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const typeStr = (Array.isArray(type) ? type[0] : type) || "length";
  const def = CONVERSION_DATA[typeStr] || CONVERSION_DATA["length"];

  const [fromUnit, setFromUnit] = useState(def.units[0]);
  const [toUnit, setToUnit] = useState(def.units[1]);
  const [inputValue, setInputValue] = useState("0");

  const toggleUnits = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
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

  const result = useMemo(() => {
    const num = parseFloat(inputValue);
    if (isNaN(num)) return "0";
    const res = def.convert(num, fromUnit, toUnit);
    return res.toLocaleString(undefined, { maximumFractionDigits: 4 });
  }, [inputValue, fromUnit, toUnit, def]);

  const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", ".", "0", "backspace"];

  return (
    <View style={styles.container}>
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <MaterialIcons name="arrow-back" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{def.title}</Text>
        <View style={{ width: 32 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.conversionBox}>
          {/* From */}
          <View style={[styles.inputCard, styles.inputCardFrom]}>
            <View style={styles.unitRow}>
              <Text style={styles.unitLabel}>FROM</Text>
              <TouchableOpacity style={styles.unitSelector}>
                <Text style={styles.unitText}>{fromUnit}</Text>
                <MaterialIcons name="expand-more" size={18} color={theme.colors["on-surface"]} />
              </TouchableOpacity>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueText} numberOfLines={1} adjustsFontSizeToFit>
                {inputValue}
              </Text>
              <Text style={styles.valueSymbol}>{def.symbols[fromUnit]}</Text>
            </View>
          </View>

          {/* Sync / Swap */}
          <View style={styles.swapContainer}>
            <TouchableOpacity style={styles.swapButton} onPress={toggleUnits} activeOpacity={0.8}>
              <MaterialIcons name="swap-vert" size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* To */}
          <View style={[styles.inputCard, styles.inputCardTo]}>
            <View style={styles.unitRow}>
              <Text style={styles.unitLabel}>TO</Text>
              <TouchableOpacity style={[styles.unitSelector, { backgroundColor: theme.colors["surface-container-low"] }]}>
                <Text style={styles.unitText}>{toUnit}</Text>
                <MaterialIcons name="expand-more" size={18} color={theme.colors["on-surface"]} />
              </TouchableOpacity>
            </View>
            <View style={styles.valueRow}>
              <Text style={styles.valueResult} numberOfLines={1} adjustsFontSizeToFit>
                {result}
              </Text>
              <Text style={styles.valueResultSymbol}>{def.symbols[toUnit]}</Text>
            </View>
          </View>
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {keys.map((k) => (
            <TouchableOpacity
              key={k}
              style={[styles.key, k === "backspace" && styles.keyDanger]}
              onPress={() => handlePress(k)}
              activeOpacity={0.7}
            >
              {k === "backspace" ? (
                <MaterialIcons name="backspace" size={24} color={theme.colors.error} />
              ) : (
                <Text style={styles.keyText}>{k}</Text>
              )}
            </TouchableOpacity>
          ))}
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
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  conversionBox: {
    marginBottom: 32,
  },
  inputCard: {
    padding: 24,
    borderRadius: 16,
  },
  inputCardFrom: {
    backgroundColor: theme.colors["surface-container-low"],
  },
  inputCardTo: {
    backgroundColor: theme.colors["surface-container-lowest"],
    borderWidth: 1,
    borderColor: theme.colors["surface-container-high"],
  },
  unitRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  unitLabel: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors["on-surface-variant"],
    letterSpacing: 1.5,
  },
  unitSelector: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: theme.colors["surface-container-lowest"],
  },
  unitText: {
    fontSize: 14,
    fontWeight: "600",
    color: theme.colors["on-surface"],
  },
  valueRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "flex-end",
  },
  valueText: {
    fontSize: 48,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: -2,
  },
  valueResult: {
    fontSize: 48,
    fontWeight: "800",
    color: theme.colors.primary,
    letterSpacing: -2,
  },
  valueSymbol: {
    fontSize: 20,
    fontWeight: "500",
    color: theme.colors["on-surface-variant"],
    marginLeft: 8,
  },
  valueResultSymbol: {
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(72, 63, 240, 0.7)",
    marginLeft: 8,
  },
  swapContainer: {
    alignItems: "center",
    marginVertical: -24,
    zIndex: 10,
  },
  swapButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 32,
    elevation: 8,
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
    backgroundColor: theme.colors["surface-container-low"],
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  keyDanger: {
    backgroundColor: "rgba(158, 63, 78, 0.1)",
  },
  keyText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
  },
});
