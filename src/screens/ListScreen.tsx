import React, { useEffect } from "react";
import { View, FlatList, ActivityIndicator, Text, RefreshControl } from "react-native";
import { observer } from "mobx-react-lite";
import { shiftStore } from "../stores/ShiftStore";
import { ensureLocationPermission, getCurrentPosition } from "../utils/location";
import ShiftCard from "../components/ShiftCard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";

type Props = NativeStackScreenProps<any, "List">;

const ListScreen = observer(({ navigation }: Props) => {
  async function load() {
    const ok = await ensureLocationPermission();
    if (!ok) return;
    const pos = await getCurrentPosition();
    await shiftStore.load(pos.lat, pos.lon);
  }

  useEffect(() => {
    load();
  }, []);

  if (shiftStore.isLoading && shiftStore.shifts.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (shiftStore.error && shiftStore.shifts.length === 0) {
    return (
      <View style={{ padding: 16 }}>
        <Text>{shiftStore.error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={shiftStore.shifts}
      keyExtractor={(item) => item.id}
      refreshControl={<RefreshControl refreshing={shiftStore.isLoading} onRefresh={load} />}
      renderItem={({ item }) => (
        <ShiftCard shift={item} onPress={() => navigation.navigate("Detail", { id: item.id })} />
      )}
      contentContainerStyle={{ padding: 12 }}
    />
  );
});

export default ListScreen;
