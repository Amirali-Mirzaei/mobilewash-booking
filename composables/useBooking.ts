export const useBooking = () => {

  const booking = useState("booking", () => ({

    date: null as Date | null,

    time: "",

    firstName: "",

    lastName: "",

    phone: "",

    address: ""

  }));

  return {
    booking
  };
};