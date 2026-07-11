import { ReservationCustomerForm, ReservationBookingButton, ReservationBookingSummary } from '../.nuxt/components';
<template>
  <!--edit-->
  <section class="reservation-page">

   <Transition name="terms">
      <div
        v-if="!accepted"
        class="terms-overlay">

        <div class="terms-card">
          <span class="subtitle">
            Please Review Before Booking
          </span>

          <h2>Vehicle Preparation & Customer Responsibility</h2>

          <p class="intro">
            To ensure the best service and protect your belongings, please review
            the following information before your appointment.
          </p>

          <ul>
            <li>
              Please remove all personal belongings from your vehicle before your
              appointment, including cash, wallets, electronics, sunglasses,
              documents, and other valuables.
            </li>

            <li>
              While we take great care during every service, we are not
              responsible for any personal items that are lost, misplaced, or
              damaged before, during, or after the service.
            </li>

            <li>
              If personal belongings are left inside the vehicle, they may need
              to be moved during the cleaning process. We are not liable for any
              missing or damaged items.
            </li>

            <li>
              Please inform us in advance if your vehicle has any pre-existing
              damage, loose interior trim, broken parts, or sensitive areas that
              require special attention.
            </li>

            <li>
              We recommend removing any child seats if you would like the areas
              underneath and behind them to be thoroughly cleaned.
            </li>

            <li>
              For health and safety reasons, vehicles containing hazardous
              materials, excessive biohazards, or illegal substances may be
              refused service.
            </li>

            <li>
              By booking our services, you acknowledge and agree to these terms
              and conditions.
            </li>
          </ul>

          <label class="agree">
            <input
              type="checkbox"
              v-model="agreed"
            />

            <span>
              I have read and agree to the Terms & Conditions.
            </span>
          </label>

          <button
            class="continue-btn"
            :disabled="!agreed"
            @click="accepted = true">
            Continue to Booking →
          </button>

        </div>
      </div>
    </Transition>


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

    <div
      ref="bookingSection"
      class="booking-card">

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
import { ref } from "vue";

const agreed = ref(false);
const accepted = ref(false);
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
color: $primary;
font-weight: 600;
}

.terms-overlay {
position: fixed;
inset: 0;
z-index: 9999;
display: flex;
justify-content: center;
align-items: center;
padding: 30px;
background: rgba(0,0,0,.82);
backdrop-filter: blur(18px);
}

.terms-card {
width: min(900px,100%);
max-height: 85vh;
overflow-y: auto;
background: rgba(15,15,15,.95);
backdrop-filter: blur(25px);
border: 1px solid rgba(212,175,55,.25);
border-radius: 28px;
padding: 45px;
}

.terms-card h2 {
color:white;
margin:15px 0;
}

.intro {
color: #c9c9c9;
line-height: 1.8;
margin-bottom: 25px;
}

.terms-card ul {
display: flex;
flex-direction: column;
gap: 18px;
color: $gray-100;
line-height: 1.8;
padding-left: 22px;
}

.terms-card li::marker{
  color:$primary;
}

.agree {
display: flex;
align-items: flex-start;
gap: 12px;
margin-top: 35px;
color: white;
}

.agree input {
width: 18px;
height: 18px;
accent-color: $primary;
margin-top: 4px;
cursor: pointer;
}

.continue-btn {
width: 100%;
margin-top: 30px;
padding: 18px;
border: none;
border-radius: 14px;
background: $primary;
color: $secondry;
font-size: 1rem;
font-weight: 700;
transition: .35s;
cursor: pointer;
}

.continue-btn:hover:not(:disabled) {
transform: translateY(-3px);  
background: $primary-hover;
}

.continue-btn:disabled {
  background: #333;
  color: #777;
  cursor: not-allowed;
}

.terms-enter-active,
.terms-leave-active {
transition: all .45s ease;
}

.terms-enter-from,
.terms-leave-to {
opacity:0;
}

.terms-enter-from .terms-card {
transform: translateY(50px) scale(.92);
opacity: 0;
}

.terms-leave-to .terms-card {
transform: translateY(-40px) scale(.95);
opacity: 0;
}

.terms-card {
transition: .45s ease;
}
</style>