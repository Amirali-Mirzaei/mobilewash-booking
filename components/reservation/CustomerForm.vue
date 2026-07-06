<template>
  <div class="form-grid">

    <div class="input-group">
      <label>First Name</label>
        <input
         :value="booking.firstName"
         type="text"
         placeholder="Jack"
         @input="onFirstNameInput"
         @blur="touch('firstName')"
         :class="{
            valid: isFieldValid('firstName'),
            invalid: isFieldInvalid('firstName')}"/>

           <p
            v-if="touched.firstName && errors.firstName"
            class="error">
            {{ errors.firstName }} </p>
     </div>

    <div class="input-group">
      <label>Last Name</label>
       <input
         :value="booking.lastName"
         type="text"
         placeholder="Sparrow"
         @input="onLastNameInput"
         @blur="touch('lastName')"
        :class="{
            valid: isFieldValid('lastName'),
            invalid: isFieldInvalid('lastName')}"/>

           <p
            v-if="touched.lastName && errors.lastName"
            class="error">
            {{ errors.lastName }} </p>
    </div>

    <div class="input-group">
     <label>Phone number</label>
      <input
         :value="booking.phone"
         type="tel"
         placeholder="+1 555 123 4567"
         @input="onPhoneInput"
         @blur="touch('phone')"
         :class="{
             valid:isFieldValid('phone'),
             invalid:isFieldInvalid('phone')}"/>

           <p
            v-if="touched.phone && errors.phone"
            class="error">
            {{ errors.phone }} </p>
    </div>

    <div class="input-group full-width">
      <label>Address</label>
       <textarea
         :value="booking.address"
         rows="4"
         placeholder="Street, City, Postal Code"
         @input="onAddressInput"
         @blur="touch('address')"
         :class="{
              valid:isFieldValid('address'),
              invalid:isFieldInvalid('address')}"/>

          <p
           v-if="touched.address && errors.address"
           class="error">
          {{ errors.address }} </p>
   </div>
</div>
</template>

<script setup lang="ts">
import type { Value } from 'sass-embedded';

const { booking } = useBooking();
const { errors, touched, touch } = useValidation();

const isFieldValid = (field: keyof typeof touched.value) => {
  return touched.value[field] && !errors.value[field];
};

const isFieldInvalid = (field: keyof typeof touched.value) => {
  return touched.value[field] && !!errors.value[field];
};


const onFirstNameInput = (event: Event) => {
  const input = event.target as HTMLInputElement;

  input.value = input.value
    .replace(/[^a-zA-Z\s]/g, "")
    .slice(0, 30);

  booking.value.firstName = input.value;
};

const onLastNameInput = (event: Event) => {
  const input = event.target as HTMLInputElement;

  input.value = input.value
    .replace(/[^a-zA-Z\s]/g, "")
    .slice(0, 30);

  booking.value.lastName = input.value;
};

const onPhoneInput = (event: Event) => {
  const input = event.target as HTMLInputElement;

  input.value = input.value
    .replace(/[^0-9+\-()\s]/g, "")
    .slice(0, 18);

  booking.value.phone = input.value;
};

const onAddressInput = (event: Event) => {
  const input = event.target as HTMLTextAreaElement;

  input.value = input.value.slice(0, 200);

  booking.value.address = input.value;
};
</script>

<style scoped lang="scss">
@use "@/assets/styles/variables" as *;

.form-grid {
display: grid;
grid-template-columns: repeat(2,1fr);
gap: 20px;
}

.input-group {
display: flex;
flex-direction: column;
gap: 10px;
}

.full-width {
grid-column: 1/-1;
}

label {
color: $primary;
font-size: .9rem;
font-weight: 600;
}

input,
textarea {
width:100%;
background:rgba(255,255,255,.05);
border:1px solid rgba(212,175,55,.15);
border-radius:16px;
padding:16px;
color:white;
outline:none;
transition:.35s;
font-size:15px;
}

input:focus,
textarea:focus{
border-color: $primary;
box-shadow:0 0 18px rgba(212,175,55,.3);
}

.valid {
border-color:#3ecf8e !important;
box-shadow:0 0 18px rgba(62,207,142,.25);
}

.invalid {
border-color:#ff5d5d !important;
box-shadow:0 0 18px rgba(255,93,93,.25);
}

textarea {
resize: none;
}

.error {
  color: #ff6b6b;
  font-size: .82rem;
  margin-top: 6px;
  padding-left: 4px;
  animation: fadeIn .25s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-6px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@media(max-width:768px) {

.form-grid {
grid-template-columns: 1fr;
}

.full-width {
grid-column: auto;
 }
}
</style>