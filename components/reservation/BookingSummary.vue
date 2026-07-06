<template>

  <div class="summary-card">
    <div class="summary-header">
      <h2>Booking Summary</h2>
    </div>

    <div class="summary-item">

      <span>Date</span>

      <strong>
        {{ formattedDate }}
      </strong>

    </div>

    <div class="summary-item">

      <span>Time</span>

      <strong>
        {{ booking.time || "Not selected" }}
      </strong>

    </div>

    <div class="summary-item">

      <span>Customer</span>

      <strong>
        {{ fullName }}
      </strong>

    </div>

    <div class="summary-item">

      <span>Phone</span>

      <strong>
        {{ booking.phone || "-" }}
      </strong>

    </div>

  </div>
</template>

<script setup lang="ts">

const { booking } = useBooking();

const formattedDate = computed(() => {

  if (!booking.value.date) return "Not selected";

  return booking.value.date.toLocaleDateString("en-US",{

    weekday:"long",

    month:"long",

    day:"numeric",

    year:"numeric"

  });

});

const fullName = computed(() => {

  if(
    !booking.value.firstName &&
    !booking.value.lastName
  ) {
    return "-";
  }
  return `${booking.value.firstName} ${booking.value.lastName}`;
});

</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.summary-card {
background: rgba(255,255,255,.04);
border: 1px solid rgba(212,175,55,.18);
border-radius:24px;
padding: 28px;
display: flex;
flex-direction: column;
gap: 22px;
backdrop-filter: blur(18px);
}

.summary-header {
padding-bottom: 15px;
border-bottom: 1px solid rgba(212,175,55,.15);
}

.summary-header h2 {
color: #fff;
font-size: 1.3rem;
}

.summary-item {
display: flex;
justify-content: space-between;
align-items: center;
gap: 20px;
}

.summary-item span {
color: #9d9d9d;
font-size: .92rem;
}

.summary-item strong {
color: white;
font-weight: 600;
text-align: right;
}
</style>