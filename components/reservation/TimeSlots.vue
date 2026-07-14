<template>
    <!--edit-->
  <div class="time-slots">
    <button
      v-for="slot in timeSlots"
      :key="slot"
      class="slot"
      :class="{ active: booking.time === slot }"
      @click="booking.time = slot">
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

  if (day >= 1 && day <= 5) {
    return generateSlots(8, 13);
  }

  return generateSlots(14, 19);
});

watch(
  () => booking.value.date,
  () => {
    if (!timeSlots.value.includes(booking.value.time)) {
      booking.value.time = "";
    }
  }
);
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.time-slots {
display: grid;
grid-template-columns: repeat(auto-fill,minmax(130px,1fr));
gap: 15px;
}

.slot {
height: 60px;
border-radius: 16px;
background: rgba(255,255,255,.04);
border: 1px solid rgba(212,175,55,.18);
color: white;
transition: .35s;
font-weight: 600;
cursor: pointer;
}

.slot:hover {
transform: translateY(-4px);
border-color: $primary;
box-shadow: 0 0 18px rgba(212,175,55,.25);
}

.active {
background: $primary;
color: $secondry;
box-shadow: 0 0 25px rgba(212,175,55,.5);
}
</style>