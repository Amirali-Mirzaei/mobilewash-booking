import { ReservationCustomerForm, ReservationBookingButton, ReservationBookingSummary } from '../.nuxt/components';
<template>
  <!--edit-->
  <section class="reservation-page">
      <div class="overlay"></div>

       <div class="container">
         <div class="hero">

           <span class="subtitle">
              Premium mobilewash Experience
           </span>

        <h1>
          Book Your
          <span>Appointment</span>
        </h1>

        <p>
          Choose your preferred date and time, then complete your booking in just a few steps.
        </p>
      </div>

     <div class="booking-card">

  <div class="section">
    <h2>Select Date</h2>

<ReservationBookingCalendar />
  </div>

  <div class="section">
    <h2>Available Time</h2>
    <ReservationTimeSlots />
  </div>
  
  <div class="section">
    <h2>Customer Information</h2>
    <ReservationCustomerForm />
  </div>
  <ReservationBookingSummary />
  <ReservationBookingButton />
     </div>
  </div>
  </section>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.reservation-page {
min-height: 100vh;
position: relative;
background: $secondry;
overflow: hidden;
padding: 140px 20px 80px;
}

.overlay {
position: absolute;
inset: 0;
background:
 radial-gradient(circle at top left,#D4AF3725,transparent 40%),
 radial-gradient(circle at bottom right,#D4AF3715,transparent 35%);
 filter:blur(80px);
}

.container {
position:relative;
max-width:1200px;
margin:auto;
}

.hero {
text-align:center;
margin-bottom:60px;
}

.subtitle {
color: $primary-light;
letter-spacing: 3px;
text-transform: uppercase;
font-size: .9rem;
}

.hero h1 {
color: white;
font-size: 4rem;
margin: 20px 0;
font-weight: 800;
}

.hero h1 span {
color: $primary;
}

.hero p {
color: $primary-light;
max-width: 700px;
margin: auto;
line-height: 1.8;
font-weight: 700;
}

.booking-card {
backdrop-filter: blur(25px);
background: rgba(255,255,255,.04);
border: 1px solid rgba(212,175,55,.2);
border-radius: 30px;
padding: 40px;
display: grid;
gap: 35px;
}

.section h2 {
color: white;
margin-bottom: 20px;
}

.placeholder {
height: 160px;
border-radius: 20px;
border: 1px dashed rgba(212,175,55,.35);
display: flex;
justify-content: center;
align-items: center;
color: #888;
transition: .4s;
}

.placeholder:hover {
border-color: $primary;
color:white;
transform:translateY(-4px);
}

@media(max-width:768px){

.hero h1 {
font-size:2.5rem;
}

.booking-card {
  padding:25px;
  }
}

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
border-radius: 12px;
background: $primary;
color:#111;
transition: .3s;
font-size: 18px;
cursor: pointer;
}

.calendar-header button:hover {
transform:scale(1.08);
}

.calendar-grid {
display: grid;
grid-template-columns: repeat(7,1fr);
gap: 12px;
}

.weekday {
text-align: center;
color: $priamry;
font-weight: 600;
}
</style>