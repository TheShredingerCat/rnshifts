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
      <View style={{ padding: 16 }}>
        <Text>Смена не найдена (обновите список).</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {shift.logo ? (
        <Image source={{ uri: shift.logo }} style={{ height: 140, borderRadius: 12, marginBottom: 12 }} />
      ) : null}
      <Text style={{ fontWeight: "800", fontSize: 18 }}>{shift.companyName}</Text>
      <Text style={{ marginTop: 6 }}>{shift.workTypes}</Text>
      <Text>{shift.address}</Text>
      <Text>
        {shift.dateStartByCity} • {shift.timeStartByCity}–{shift.timeEndByCity}
      </Text>
      <Text style={{ marginTop: 8 }}>Оплата: {shift.priceWorker} ₽</Text>
      <Text>
        Набрано: {shift.currentWorkers}/{shift.planWorkers}
      </Text>
      <Text>
        Рейтинг: ★ {shift.customerRating} ({shift.customerFeedbacksCount})
      </Text>
    </ScrollView>
  );
}
