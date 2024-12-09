export const emailValididate = (email) => {
  return email?.match(/[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}/g) ? email : '';
};
