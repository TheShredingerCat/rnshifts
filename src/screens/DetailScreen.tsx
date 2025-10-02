import React, { useMemo } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { shiftStore } from "../stores/ShiftStore";

type Props = NativeStackScreenProps<any, "Detail">;

export default function DetailScreen({ route }: Props) {
  const { id } = route.params as { id: string };
  const shift = useMemo(() => shiftStore.getById(id), [id, shiftStore.shifts]);

  if (!shift) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Смена не найдена (обновите список).</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16, alignItems: "center" }}>
      {shift.logo ? (
        <Image
          source={typeof shift.logo === "number" ? shift.logo : { uri: shift.logo }}
          style={{ width: 80, height: 80, borderRadius: 12, marginBottom: 12 }}
          resizeMode="contain"
        />
      ) : null}

      <Text style={{ fontWeight: "800", fontSize: 20, color: "#1976d2", marginBottom: 6 }}>
        {shift.companyName}
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>{Array.isArray(shift.workTypes) ? shift.workTypes[0]?.name : shift.workTypes}</Text>

      <View
        style={{
          backgroundColor: "#f9f9f9",
          borderRadius: 12,
          padding: 16,
          width: "100%",
          elevation: 2,
        }}
      >
        <Text style={{ marginBottom: 6 }}>📍 {shift.address}</Text>
        <Text style={{ marginBottom: 6 }}>📅 {shift.dateStartByCity} • {shift.timeStartByCity}–{shift.timeEndByCity}</Text>
        <Text style={{ marginBottom: 6, fontWeight: "700", color: "#2e7d32" }}>💰 Оплата: {shift.priceWorker} ₽</Text>
        <Text style={{ marginBottom: 6 }}>👥 Набрано: {shift.currentWorkers}/{shift.planWorkers}</Text>
        <Text style={{ marginBottom: 6 }}>⭐ Рейтинг: {shift.customerRating ?? "—"} ({shift.customerFeedbacksCount})</Text>
      </View>
    </ScrollView>
  );
}
