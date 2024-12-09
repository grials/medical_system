export const telephoneValidate = (telephone) => {
  const newTelePhone = `+${telephone?.replace(/\D/g, '')}`;

  return newTelePhone?.length >= 9 && newTelePhone?.length <= 14 ? newTelePhone : '';
};
