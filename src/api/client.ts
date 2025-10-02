export type WorkType = { id: number; name: string };
export type Shift = {
  id: string;
  logo: string | null;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: number;
  planWorkers: number;
  workTypes: string;
  priceWorker: number;
  customerFeedbacksCount: string;
  customerRating: number | null;
};

const TEST_SHIFTS: Shift[] = [
  {
    id: "test1",
    logo: require("../assets/images/react-logo.png"),
    address: "Краснодар, ул. Тестовая, 1",
    companyName: "ООО Тест",
    dateStartByCity: "03.10.2025",
    timeStartByCity: "09:00",
    timeEndByCity: "18:00",
    currentWorkers: 2,
    planWorkers: 5,
    workTypes: "Разнорабочий",
    priceWorker: 2500,
    customerFeedbacksCount: "5 отзывов",
    customerRating: 4.3,
  },
  {
    id: "test2",
    logo: require("../assets/images/google-logo.png"),
    address: "Краснодар, ул. Примерная, 2",
    companyName: "Google LLC",
    dateStartByCity: "03.10.2025",
    timeStartByCity: "10:00",
    timeEndByCity: "19:00",
    currentWorkers: 3,
    planWorkers: 4,
    workTypes: "Грузчик",
    priceWorker: 3000,
    customerFeedbacksCount: "10 отзывов",
    customerRating: 4.8,
  },
  {
    id: "test3",
    logo: require("../assets/images/yandex-logo.png"),
    address: "Краснодар, ул. Проверочная, 3",
    companyName: "Яндекс",
    dateStartByCity: "03.10.2025",
    timeStartByCity: "08:30",
    timeEndByCity: "17:30",
    currentWorkers: 10,
    planWorkers: 8,
    workTypes: "Фасовщик",
    priceWorker: 2800,
    customerFeedbacksCount: "32 отзыва",
    customerRating: 4.6,
  },
  {
    id: "test4",
    logo: require("../assets/images/sample-logo.png"),
    address: "Краснодар, ул. Образцовая, 4",
    companyName: "ООО Пример",
    dateStartByCity: "03.10.2025",
    timeStartByCity: "07:00",
    timeEndByCity: "16:00",
    currentWorkers: 0,
    planWorkers: 3,
    workTypes:"Подсобный рабочий",
    priceWorker: 2200,
    customerFeedbacksCount: "нет отзывов",
    customerRating: null,
  },
  {
    id: "test5",
    logo: require("../assets/images/netflix-logo.png"),
    address: "Краснодар, ул. Netflix, 5",
    companyName: "Netflix",
    dateStartByCity: "03.10.2025",
    timeStartByCity: "12:00",
    timeEndByCity: "20:00",
    currentWorkers: 1,
    planWorkers: 1,
    workTypes: "Кассир",
    priceWorker: 4000,
    customerFeedbacksCount: "100 отзывов",
    customerRating: 5,
  },
];

export async function fetchShifts(lat: number, lng: number): Promise<Shift[]> {
  try {
    const url = `https://mobile.handswork.pro/api/shift?latitude=${lat}&longitude=${lng}`;

    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        return TEST_SHIFTS;
      }
      return TEST_SHIFTS;
    }
    const json = await res.json();
    const data = Array.isArray(json) ? json : json?.data;
    return Array.isArray(data) ? (data as Shift[]) : TEST_SHIFTS;
  } catch (e) {
    console.error("API error:", e);
    return TEST_SHIFTS;
  }
}
