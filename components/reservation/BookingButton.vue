<template>
  <button
    class="booking-btn"
    :disabled="!isValid || loading"
    @click="bookAppointment"
  >
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
import Swal from "sweetalert2";

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
  if (!isValid.value || loading.value) return;

  loading.value = true;

  try {
    const response = await $fetch("/api/booking", {
      method: "POST",
      body: booking.value,
    });

    console.log(response);

   await Swal.fire({
  icon: "success",
  title: "Thank You!",
  html: `
      <div style="font-size:16px;line-height:1.8">
        <b>Your booking has been confirmed.</b><br><br>

         &#128197; Your appointment has been successfully scheduled.

        <br><br>

         &#128222; Need to cancel or change your appointment?
        Please contact us by phone.

        <br><br>

        <span style="color:#D4AF37;font-weight:700">
        We look forward to serving you!
        </span>
      </div>
  `,
  confirmButtonText: "Done",
  confirmButtonColor: "#D4AF37",
  background: "#181818",
  color: "#fff",
  width: 500,
  showClass: {
    popup: "animate__animated animate__zoomIn",
  },
  hideClass: {
    popup: "animate__animated animate__zoomOut",
  },
});

      booking.value = {
           firstName: "",
           lastName: "",
           phone: "",
           address: "",
           date: null,
           time: "",
         };
  } catch (error: any) {
  console.error(error);

  const status = error?.statusCode || error?.response?.status;
  const message =
    error?.data?.statusMessage ||
    error?.response?._data?.statusMessage;

  switch (status) {
    case 409:
      await Swal.fire({
        icon: "error",
        title: "Time Slot Unavailable",
        text: "This time slot has already been booked. Please choose another available time.",
        confirmButtonText: "OK",
        confirmButtonColor: "#D4AF37",
        background: "#181818",
        color: "#fff",
      });
      break;

    case 429:
      await Swal.fire({
        icon: "warning",
        title: "Please Wait",
        text: "Please wait a few seconds before booking again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#D4AF37",
        background: "#181818",
        color: "#fff",
      });
      break;

    case 400:
      await Swal.fire({
        icon: "warning",
        title: "Invalid Information",
        text: "Please check your booking information and try again.",
        confirmButtonText: "OK",
        confirmButtonColor: "#D4AF37",
        background: "#181818",
        color: "#fff",
      });
      break;

    default:
      await Swal.fire({
        icon: "error",
        title: "Booking Failed",
        text: message || "Something went wrong. Please try again later.",
        confirmButtonText: "OK",
        confirmButtonColor: "#D4AF37",
        background: "#181818",
        color: "#fff",
      });
  }
} finally {
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
font-size: 18px;
font-weight: 700;
background: $primary;
color: #111;
transition: .35s;
}

.booking-btn:hover:not(:disabled) {
transform: translateY(-5px);
box-shadow: 0 0 35px rgba(212, 175, 55, .45);
}

.booking-btn:disabled {
opacity: .35;
cursor: not-allowed;
transform: none;
}
</style>