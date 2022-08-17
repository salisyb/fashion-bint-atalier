var number = 35049300;

console.log(
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumSignificantDigits: 3,
  }).format(number)
);
