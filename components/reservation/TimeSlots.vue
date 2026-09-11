<template>
  <div class="time-slots">
    <button
      v-for="slot in timeSlots"
      :key="slot"
      class="slot"
      :class="{
        active: booking.time === slot,
        disabled: isSlotDisabled(slot),
      }"
      :disabled="isSlotDisabled(slot)"
      @click="booking.time = slot"
    >
      {{ slot }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

const { booking } = useBooking();

const bookedTimes = ref<string[]>([]);
const loadingAvailability = ref(false);

const formatTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${minute
    .toString()
    .padStart(2, "0")} ${period}`;
};

const generateSlots = (startHour: number, endHour: number) => {
  const slots: string[] = [];

  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(formatTime(hour, 0));
    slots.push(formatTime(hour, 30));
  }

  slots.push(formatTime(endHour, 0));

  return slots;
};

const timeSlots = computed(() => {
  if (!booking.value.date) return [];

  const day = booking.value.date.getDay();

  if (day === 0 || day === 1 || day === 5) {
    return generateSlots(8, 20);
  }

  return generateSlots(16, 20);
});

const timeToMinutes = (time: string): number => {
  const parts = time.split(" ");

  const timePart = parts[0];
  const period = parts[1];

  if (!timePart || !period) {
    return 0;
  }

  const timeParts = timePart.split(":");

  const hourString = timeParts[0];
  const minuteString = timeParts[1];

  if (!hourString || !minuteString) {
    return 0;
  }

  let hour = Number(hourString);
  const minute = Number(minuteString);

  if (period === "AM" && hour === 12) {
    hour = 0;
  }

  if (period === "PM" && hour !== 12) {
    hour += 12;
  }

  return hour * 60 + minute;
};

const getVancouverDate = (): string => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find(
    (part) => part.type === "year"
  )?.value;

  const month = parts.find(
    (part) => part.type === "month"
  )?.value;

  const day = parts.find(
    (part) => part.type === "day"
  )?.value;

  return `${year}-${month}-${day}`;
};

const getSelectedDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const selectedDateIsToday = computed(() => {
  if (!booking.value.date) return false;

  return (
    getSelectedDate(booking.value.date) ===
    getVancouverDate()
  );
});

const isSlotDisabled = (slot: string): boolean => {
  if (selectedDateIsToday.value) {
    return true;
  }

  const slotStart = timeToMinutes(slot);

  return bookedTimes.value.some((bookedTime) => {
    const bookedStart = timeToMinutes(bookedTime);

    return (
      slotStart >= bookedStart &&
      slotStart <= bookedStart + 60
    );
  });
};

const fetchAvailability = async () => {
  if (!booking.value.date) {
    bookedTimes.value = [];
    return;
  }

  if (selectedDateIsToday.value) {
    bookedTimes.value = [];
    booking.value.time = "";
    return;
  }
 
  loadingAvailability.value = true;

  try {
    const date = getSelectedDate(booking.value.date);

    const response = await $fetch<{
      bookedTimes: string[];
    }>("/api/booking/availability", {
      query: {
        date,
      },
    });

    bookedTimes.value = response.bookedTimes || [];

    if (
      booking.value.time &&
      isSlotDisabled(booking.value.time)
    ) {
      booking.value.time = "";
    }
  } catch (error) {
    console.error(
      "Failed to fetch booking availability:",
      error
    );

    bookedTimes.value = [];
  } finally {
    loadingAvailability.value = false;
  }
};

watch(
  () => booking.value.date,
  async () => {
    booking.value.time = "";
    bookedTimes.value = [];

    await fetchAvailability();
  },
  {
    immediate: true,
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.time-slots {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(130px, 1fr)
  );
  gap: 15px;
}

.slot {
  height: 60px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid transparent;
  color: white;
  font-weight: 600;
  transition: 0.35s;
  cursor: pointer;

  &:hover:not(:disabled) {
    transform: translateY(-4px);
    border-color: $primary;
  }
}

.active {
  background: linear-gradient(
    135deg,
    $primary,
    $primary-deep
  );

  color: $secondry;
  font-weight: 700;
  border: transparent;

  box-shadow:
    0 0 20px rgba(27, 203, 247, 0.45),
    0 0 40px rgba(5, 98, 127, 0.3);
}

.slot:disabled {
  opacity: 0.25;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}
</style>