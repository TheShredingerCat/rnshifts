import React from "react";
import { Pressable, View, Image, Text } from "react-native";
import type { Shift } from "../types";

export default function ShiftCard({ shift, onPress }: { shift: Shift; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: "#fff",
        borderRadius: 12,
        padding: 12,
        marginBottom: 12,
        elevation: 2
      }}
    >
      <View style={{ flexDirection: "row", gap: 12 }}>
        {shift.logo ? (
          <Image source={{ uri: shift.logo }} style={{ width: 56, height: 56, borderRadius: 8 }} />
        ) : null}
        <View style={{ flex: 1 }}>
          <Text style={{ fontWeight: "700" }}>{shift.companyName}</Text>
          <Text>{shift.workTypes}</Text>
          <Text numberOfLines={1}>{shift.address}</Text>
          <Text>
            {shift.dateStartByCity} • {shift.timeStartByCity}–{shift.timeEndByCity}
          </Text>
          <Text>Оплата: {shift.priceWorker} ₽</Text>
          <Text>
            Набрано: {shift.currentWorkers}/{shift.planWorkers} • ★ {shift.customerRating} ({shift.customerFeedbacksCount})
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
