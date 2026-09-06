<template>
  <div class="time-slots">
    <button
      v-for="slot in timeSlots"
      :key="slot"
      class="slot"
      :class="{
        active: booking.time === slot,
        disabled: isToday(slotDate) || isSlotDisabled(slot),
      }"
      :disabled="isToday(slotDate) || isSlotDisabled(slot)"
      @click="booking.time = slot"
    >
      {{ slot }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";

const { booking } = useBooking();

const formatTime = (hour: number, minute: number): string => {
  const period = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  return `${displayHour}:${minute.toString().padStart(2, "0")} ${period}`;
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

const getVancouverDate = () => {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Vancouver",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());

  const year = parts.find((part) => part.type === "year")?.value;
  const month = parts.find((part) => part.type === "month")?.value;
  const day = parts.find((part) => part.type === "day")?.value;

  return `${year}-${month}-${day}`;
};

const getSelectedDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

const isToday = (date: Date | null) => {
  if (!date) return false;

  return getSelectedDate(date) === getVancouverDate();
};

const isSlotDisabled = (slot: string): boolean => {
  return false;
};

const slotDate = computed(() => booking.value.date);

watch(
  () => booking.value.date,
  () => {
    booking.value.time = "";
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.time-slots {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
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
  background: linear-gradient(135deg, $primary, $primary-deep);
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