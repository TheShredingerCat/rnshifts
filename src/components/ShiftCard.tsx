import React from "react";
import { Pressable, View, Image, Text, Animated } from "react-native";
import type { Shift } from "../types";

export default function ShiftCard({ shift, onPress }: { shift: Shift; onPress: () => void }) {
  const scale = new Animated.Value(1);

  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
  };

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          backgroundColor: "#fff",
          borderRadius: 12,
          padding: 12,
          marginBottom: 12,
          elevation: 3,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          {shift.logo ? (
            <Image
              source={typeof shift.logo === "number" ? shift.logo : { uri: shift.logo }}
              style={{ width: 40, height: 40, borderRadius: 8 }}
              resizeMode="contain"
            />
          ) : null}
          <View style={{ flex: 1 }}>
            <Text style={{ fontWeight: "700", fontSize: 16, color: "#333" }}>{shift.companyName}</Text>
            <Text style={{ color: "#666" }}>{Array.isArray(shift.workTypes) ? shift.workTypes[0]?.name : shift.workTypes}</Text>
            <Text numberOfLines={1} style={{ color: "#444" }}>{shift.address}</Text>
            <Text style={{ color: "#555" }}>
              {shift.dateStartByCity} • {shift.timeStartByCity}–{shift.timeEndByCity}
            </Text>
            <Text style={{ marginTop: 4, fontWeight: "700", color: "#2e7d32" }}>
              💰 {shift.priceWorker} ₽
            </Text>
            <Text style={{ fontSize: 12, color: "#777" }}>
              👥 {shift.currentWorkers}/{shift.planWorkers} • ⭐ {shift.customerRating ?? "—"} ({shift.customerFeedbacksCount})
            </Text>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
