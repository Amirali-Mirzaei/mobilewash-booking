<template>
  <div class="calendar">
    <div class="calendar-header">

     <button
        @click="previousMonth"
        :disabled="!canGoPrevious"> ←
     </button>

      <h3>
         {{ monthName }} {{ currentYear }}
      </h3>

    <button
       @click="nextMonth"
       :disabled="!canGoNext"> →
    </button>

</div>

    <div class="calendar-grid">
      <div
        v-for="day in ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']"
        :key="day"
        class="weekday">
         {{ day }}
      </div>
      <div
         v-for="(day,index) in days"
        :key="index"
        class="day"
        :class="{
            empty: !day,
            disabled: day && isDisabled(day),
            active: day && booking.date?.toDateString()===day.toDateString()
         }"
        @click="day && selectDate(day)">

      <template v-if="day">
         {{ day.getDate() }}
      </template>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const today = new Date();

const currentMonth = ref(today.getMonth());
const currentYear = ref(today.getFullYear());

const { booking } = useBooking();

const firstDayOfMonth = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1).getDay();
});

const daysInMonth = computed(() => {
  return new Date(
    currentYear.value,
    currentMonth.value + 1,
    0
  ).getDate();
});

const days = computed(() => {

  const result = [];

  for (let i = 0; i < firstDayOfMonth.value; i++) {
    result.push(null);
  }

  for (let day = 1; day <= daysInMonth.value; day++) {
    result.push(
      new Date(currentYear.value, currentMonth.value, day)
    );
  }

  return result;
});

const maxDate = new Date();
maxDate.setDate(maxDate.getDate() + 30);

const isDisabled = (date: Date) => {

  const d = new Date(date);
  d.setHours(0,0,0,0);

  const t = new Date(today);
  t.setHours(0,0,0,0);

  return d < t || d > maxDate;
};

const selectDate = (date: Date) => {

  if (isDisabled(date)) return;

booking.value.date = date;};

const monthName = computed(() => {
  return new Date(currentYear.value, currentMonth.value).toLocaleString(
    "en-US",
    { month: "long" }
  );
});

const nextMonth = () => {
  const next = new Date(currentYear.value, currentMonth.value + 1, 1);

  if (next <= maxDate) {
    currentMonth.value++;

    if (currentMonth.value > 11) {
      currentMonth.value = 0;
      currentYear.value++;
    }
  }
};

const previousMonth = () => {
  const prev = new Date(currentYear.value, currentMonth.value - 1, 1);
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);

  if (prev >= thisMonth) {
    currentMonth.value--;

    if (currentMonth.value < 0) {
      currentMonth.value = 11;
      currentYear.value--;
    }
  }
};

const canGoPrevious = computed(() => {
  return (
    currentMonth.value !== today.getMonth() ||
    currentYear.value !== today.getFullYear()
  );
});

const canGoNext = computed(() => {
  const next = new Date(currentYear.value, currentMonth.value + 1, 1);
  return next <= maxDate;
});
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.calendar {
display:flex;
flex-direction:column;
gap:20px;
}

.calendar-header {
display:flex;
justify-content:space-between;
align-items:center;
}

.calendar-header h3 {
color:white;
font-size:1.2rem;
}

.calendar-header button {
width: 45px;
height: 45px;
border: none;
border-radius: 15px;
background-color: $primary;
color: $secondry;
transition: .3s;
font-size: 22px;
cursor: pointer;
}

.calendar-header button:hover {
transform: scale(1.08);
}

.calendar-grid {
display: grid;
grid-template-columns: repeat(7,1fr);
gap: 12px;
}

.weekday {
text-align: center;
color: $primary;
font-weight: 600;
}

.day {
height: 60px;
display: flex;
align-items: center;
justify-content: center;
border-radius: 16px;
background: rgba(255,255,255,.04);
color: white;
transition: .35s;
border: 1px solid transparent;
cursor: pointer;
}

.day:hover {
transform: translateY(-4px);
border-color: $primary;
}

.empty {
background:transparent;
pointer-events: none;
}

.disabled {
opacity:.25;
pointer-events: none;
}

.active {
background: $primary;
color: $secondry;
font-weight: 700;
box-shadow: 0 0 25px rgba(212,175,55,.55);
}

.calendar-header button:disabled {
  opacity: .35;
  cursor: not-allowed;
  transform: none;
}
</style>