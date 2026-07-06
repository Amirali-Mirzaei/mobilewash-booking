<template>
  <button
    class="booking-btn"
    :disabled="!isValid || loading"
    @click="bookAppointment">
    <span v-if="!loading">
      Book Appointment
    </span>

    <span v-else>
      Booking...
    </span>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const { booking } = useBooking();
const loading = ref(false);
const isValid = computed(() => {

return (
booking.value.date &&
booking.value.time &&
booking.value.firstName.trim() &&
booking.value.lastName.trim() &&
booking.value.phone.trim() &&
booking.value.address.trim()
 );
});

const bookAppointment = async () => {

    if (!isValid.value) return;

    loading.value = true;

    try {

        const response = await $fetch('/api/booking', {

            method: 'POST',

            body: booking.value

        });

        console.log(response);

        alert("Booking request sent successfully!");

    }

    catch (error: any) {
  console.error(error);

  alert(error?.data?.statusMessage || "Something went wrong.");
}

    finally {

        loading.value = false;

    }

};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.booking-btn {
width: 100%;
height: 64px;
border: none;
border-radius: 18px;
cursor: pointer;
font-size:18px;
font-weight:700;
background: $primary;
color: #111;
transition: .35s;
}

.booking-btn:hover:not(:disabled) {
transform:translateY(-5px);
box-shadow:0 0 35px rgba(212,175,55,.45);
}

.booking-btn:disabled {
opacity:.35;
cursor:not-allowed;
transform:none;
}
</style>