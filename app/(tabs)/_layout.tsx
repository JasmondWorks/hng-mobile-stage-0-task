import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, View, Platform } from "react-native";
import { theme } from "../../constants/theme";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: theme.colors["on-surface-variant"],
      }}
    >
      <Tabs.Screen
        name="converter"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="sync-alt" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="calculator"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="calculate" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          // Home / Dashboard might use 'grid-view' or 'public'
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="grid-view" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.iconContainerActive]}>
              <MaterialIcons name="settings" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 24,
    left: "5%",
    right: "5%",
    width: "90%",
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(252, 249, 248, 0.95)",
    borderWidth: 1,
    borderColor: "rgba(179, 177, 177, 0.15)",
    elevation: 10,
    shadowColor: "#323232",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    borderTopWidth: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 0,
    ...Platform.select({
      ios: {
        shadowColor: "#323232",
        shadowOffset: { width: 0, height: 12 },
        shadowOpacity: 0.08,
        shadowRadius: 24,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  iconContainer: {
    padding: 12,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainerActive: {
    backgroundColor: theme.colors.primary,
  },
});
