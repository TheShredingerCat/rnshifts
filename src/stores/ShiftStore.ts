import { makeAutoObservable, runInAction } from "mobx";
import type { Shift } from "../types";
import { fetchShifts } from "../api/client";

class ShiftStore {
  shifts: Shift[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  async load(lat: number, lon: number) {
    this.isLoading = true;
    this.error = null;
    try {
      const data = await fetchShifts(lat, lon);
      const normalized: Shift[] = data.map((s: any, idx: number) => ({
        id: s.id?.toString?.() ?? `${s.address}-${s.dateStartByCity}-${idx}`,
        logo: s.logo ?? null,
        address: String(s.address ?? ""),
        companyName: String(s.companyName ?? ""),
        dateStartByCity: String(s.dateStartByCity ?? ""),
        timeStartByCity: String(s.timeStartByCity ?? ""),
        timeEndByCity: String(s.timeEndByCity ?? ""),
        currentWorkers: Number(s.currentWorkers ?? 0),
        planWorkers: Number(s.planWorkers ?? 0),
        workTypes: String(s.workTypes ?? ""),
        priceWorker: Number(s.priceWorker ?? 0),
        customerFeedbacksCount: Number(s.customerFeedbacksCount ?? 0),
        customerRating: Number(s.customerRating ?? 0),
      }));
      runInAction(() => {
        this.shifts = normalized;
      });
    } catch (e: any) {
      runInAction(() => { this.error = e?.message ?? "Failed to load"; });
    } finally {
      runInAction(() => { this.isLoading = false; });
    }
  }

  getById(id: string) {
    return this.shifts.find(s => s.id === id) || null;
  }
}

export const shiftStore = new ShiftStore();
