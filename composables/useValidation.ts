import { computed } from "vue";

export const useValidation = () => {
  const { booking } = useBooking();

  const touched = useState("bookingTouched", () => ({
    firstName: false,
    lastName: false,
    phone: false,
    address: false,
  }));

  const errors = computed(() => ({
    firstName:
      booking.value.firstName.trim().length >= 2
        ? ""
        : "First name must contain at least 2 characters.",

    lastName:
      booking.value.lastName.trim().length >= 2
        ? ""
        : "Last name must contain at least 2 characters.",

    phone:
      /^\+?[0-9\s()-]{10,15}$/.test(booking.value.phone)
        ? ""
        : "Please enter a valid phone number.",

    address:
      booking.value.address.trim().length >= 10
        ? ""
        : "Address must contain at least 10 characters.",
  }));

  const isValid = computed(() => {
    return (
      Object.values(errors.value).every((error) => error === "") &&
      booking.value.date &&
      booking.value.time
    );
  });

  const touch = (field: keyof typeof touched.value) => {
    touched.value[field] = true;
  };

  return {
    errors,
    touched,
    touch,
    isValid,
  };
};