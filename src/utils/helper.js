export const generateRef = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

  let ref = "";

  for (let c = 0; c <= 10; c++) {
    ref += characters[Math.floor(Math.random() * characters.length)];
  }

  return ref;
};
