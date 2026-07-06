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
const { booking } = useBooking();

const timeSlots: string[] = [];

for (let hour = 10; hour <= 18; hour++) {
  const period = hour >= 12 ? "PM" : "AM";

  const displayHour = hour % 12 === 0 ? 12 : hour % 12;

  timeSlots.push(`${displayHour}:00 ${period}`);
}
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
transform:translateY(-4px);
border-color: $primary;
box-shadow:0 0 18px rgba(212,175,55,.25);
}

.active {
background: $primary;
color:#111;
box-shadow:0 0 25px rgba(212,175,55,.5);
}
</style>