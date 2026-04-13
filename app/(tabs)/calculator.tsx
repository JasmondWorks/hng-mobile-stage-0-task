import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { theme } from "../../constants/theme";

export default function CalculatorScreen() {
  const insets = useSafeAreaInsets();
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [history, setHistory] = useState<string[]>([]);

  const handlePress = (val: string) => {
    if (val === "AC") {
      setExpression("");
      setResult("0");
      return;
    }
    if (val === "backspace") {
      setExpression(prev => prev.slice(0, -1));
      return;
    }
    if (val === "=") {
      try {
        // Very basic evaluator, replacing visually typed multiply/divide symbols with JS ones
        const evalExpression = expression.replace(/×/g, "*").replace(/÷/g, "/");
        // We use Function instead of eval for basic safe arithmetic
        const res = new Function(`return ${evalExpression || "0"}`)();
        
        // Add to history if valid and not just 0
        if (res !== undefined && !isNaN(res)) {
          setHistory(prev => [...prev.slice(-2), `${expression} = ${res}`]);
          setResult(String(res));
          setExpression(String(res));
        }
      } catch (e) {
        setResult("Error");
      }
      return;
    }

    setExpression(prev => prev + val);
    
    // Automatically preview result if it's a number ending
    try {
      const evalExpression = (expression + val).replace(/×/g, "*").replace(/÷/g, "/");
      if (evalExpression.match(/[\d)]$/)) {
        const preview = new Function(`return ${evalExpression}`)();
        if (preview !== undefined && !isNaN(preview)) {
          setResult(String(preview));
        }
      }
    } catch(e) {
      // ignore preview errors
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 16 }]}>
        <View style={styles.headerLeft}>
          <MaterialIcons name="grid-view" size={24} color={theme.colors.primary} />
          <Text style={styles.headerTitle}>UTILITY</Text>
        </View>
        <View style={styles.headerRight}>
          <MaterialIcons name="history" size={24} color="rgba(50, 50, 50, 0.6)" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Display Area */}
        <View style={styles.displayArea}>
          <View style={styles.historyContainer}>
            {history.map((item, index) => (
              <Text key={index} style={styles.historyText}>{item}</Text>
            ))}
          </View>
          <Text style={styles.expressionText} numberOfLines={1} adjustsFontSizeToFit>
            {expression || " "}
          </Text>
          <Text style={styles.resultText} numberOfLines={1} adjustsFontSizeToFit>
            {result}
          </Text>
        </View>

        {/* Mode Toggle */}
        <View style={styles.modeToggle}>
          <View style={styles.angleToggle}>
            <Text style={styles.angleActive}>RAD</Text>
            <Text style={styles.angleInactive}>DEG</Text>
          </View>
          <TouchableOpacity style={styles.sciButton}>
            <Text style={styles.sciButtonText}>SCIENTIFIC</Text>
            <MaterialIcons name="expand-more" size={14} color={theme.colors["on-surface"]} />
          </TouchableOpacity>
        </View>

        {/* Keypad */}
        <View style={styles.keypad}>
          {/* Scientific Row */}
          <TouchableOpacity style={styles.sciKey} onPress={() => handlePress("Math.sin(")}><Text style={styles.sciKeyText}>sin</Text></TouchableOpacity>
          <TouchableOpacity style={styles.sciKey} onPress={() => handlePress("Math.cos(")}><Text style={styles.sciKeyText}>cos</Text></TouchableOpacity>
          <TouchableOpacity style={styles.sciKey} onPress={() => handlePress("Math.log10(")}><Text style={styles.sciKeyText}>log</Text></TouchableOpacity>
          <TouchableOpacity style={[styles.sciKey, styles.acKey]} onPress={() => handlePress("AC")}><Text style={styles.acKeyText}>AC</Text></TouchableOpacity>

          {/* Numbers & Operators */}
          <View style={styles.mainGrid}>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("7")}><Text style={styles.numText}>7</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("8")}><Text style={styles.numText}>8</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("9")}><Text style={styles.numText}>9</Text></TouchableOpacity>
            <TouchableOpacity style={styles.opKey} onPress={() => handlePress("÷")}><Text style={styles.opText}>÷</Text></TouchableOpacity>

            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("4")}><Text style={styles.numText}>4</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("5")}><Text style={styles.numText}>5</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("6")}><Text style={styles.numText}>6</Text></TouchableOpacity>
            <TouchableOpacity style={styles.opKey} onPress={() => handlePress("×")}><Text style={styles.opText}>×</Text></TouchableOpacity>

            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("1")}><Text style={styles.numText}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("2")}><Text style={styles.numText}>2</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("3")}><Text style={styles.numText}>3</Text></TouchableOpacity>
            <TouchableOpacity style={styles.opKey} onPress={() => handlePress("-")}><Text style={styles.opText}>−</Text></TouchableOpacity>

            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("0")}><Text style={styles.numText}>0</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress(".")}><Text style={styles.numText}>.</Text></TouchableOpacity>
            <TouchableOpacity style={styles.numKey} onPress={() => handlePress("backspace")}>
              <MaterialIcons name="backspace" size={24} color={theme.colors["on-surface"]} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.opKey} onPress={() => handlePress("+")}><Text style={styles.opText}>+</Text></TouchableOpacity>
          </View>

          {/* Equals */}
          <TouchableOpacity style={styles.eqKey} onPress={() => handlePress("=")}>
            <Text style={styles.eqText}>=</Text>
          </TouchableOpacity>
        </View>

        {/* Tooltip */}
        <View style={styles.tooltipCard}>
          <View style={styles.tooltipIconBox}>
            <MaterialIcons name="info" size={14} color={theme.colors.primary} />
          </View>
          <View style={styles.tooltipContext}>
            <Text style={styles.tooltipTitle}>DID YOU KNOW?</Text>
            <Text style={styles.tooltipText}>You can combine standard operators along with our full layout feature.</Text>
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
    gap: 8,
  },
  headerTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
    letterSpacing: 1,
  },
  headerRight: {
    flexDirection: "row",
    gap: 16,
  },
  content: {
    padding: 24,
    paddingBottom: 120, // space for tab bar
    maxWidth: 500,
    alignSelf: "center",
    width: "100%",
  },
  displayArea: {
    backgroundColor: theme.colors["surface-container-low"],
    borderRadius: 16,
    padding: 24,
    minHeight: 160,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  historyContainer: {
    alignItems: "flex-end",
    marginBottom: 8,
    opacity: 0.4,
  },
  historyText: {
    fontSize: 14,
    fontFamily: "System",
  },
  expressionText: {
    fontSize: 18,
    color: theme.colors["on-surface-variant"],
    letterSpacing: 1,
    marginBottom: 4,
  },
  resultText: {
    fontSize: 48,
    fontWeight: "800",
    color: theme.colors["on-surface"],
    letterSpacing: -2,
  },
  modeToggle: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
    paddingHorizontal: 8,
  },
  angleToggle: {
    flexDirection: "row",
    gap: 8,
  },
  angleActive: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors.primary,
    letterSpacing: 1.5,
  },
  angleInactive: {
    fontSize: 10,
    fontWeight: "bold",
    color: "rgba(50, 50, 50, 0.4)",
    letterSpacing: 1.5,
  },
  sciButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: theme.colors["surface-container-high"],
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 999,
  },
  sciButtonText: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
    letterSpacing: 1.5,
  },
  keypad: {
    gap: 16,
  },
  sciKey: {
    flex: 1,
    height: 56,
    backgroundColor: theme.colors["surface-container-low"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    marginHorizontal: 4,
  },
  acKey: {
    backgroundColor: "rgba(158, 63, 78, 0.1)", // Error container approx
  },
  sciKeyText: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors["on-surface-variant"],
    fontWeight: "600",
  },
  acKeyText: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    color: theme.colors.error,
    fontWeight: "bold",
  },
  mainGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  numKey: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: theme.colors["surface-container-lowest"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  opKey: {
    width: "22%",
    aspectRatio: 1,
    backgroundColor: theme.colors["surface-container-high"],
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
  },
  numText: {
    fontSize: 24,
    fontWeight: "600",
    color: theme.colors["on-surface"],
  },
  opText: {
    fontSize: 24,
    fontWeight: "bold",
    color: theme.colors.primary,
  },
  eqKey: {
    backgroundColor: theme.colors.primary,
    height: 64,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 6,
    marginTop: 8,
  },
  eqText: {
    fontSize: 28,
    fontWeight: "800",
    color: "#fff",
  },
  tooltipCard: {
    flexDirection: "row",
    backgroundColor: theme.colors["surface-container-lowest"],
    padding: 20,
    borderRadius: 16,
    borderColor: "rgba(179, 177, 177, 0.15)",
    borderWidth: 1,
    marginTop: 24,
    alignItems: "flex-start",
    gap: 16,
  },
  tooltipIconBox: {
    padding: 8,
    backgroundColor: theme.colors["primary-fixed"],
    borderRadius: 8,
  },
  tooltipContext: {
    flex: 1,
  },
  tooltipTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: theme.colors["on-surface"],
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  tooltipText: {
    fontSize: 12,
    color: theme.colors["on-surface-variant"],
    lineHeight: 18,
  },
});
