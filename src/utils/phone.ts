export const formatPhoneNumber = (str: string): string => {
  //Filter only numbers from the input
  const cleaned = ('' + str).replace(/\D/g, '');

  //Check if the input is of correct
  const match = cleaned.match(/^([78])?(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    //Remove the matched extension code
    //Change this to format for any country code.
    const intlCode = (match[1] ? '+7 ' : '');
    return [intlCode, '(', match[2], ') ', match[3], '-', match[4], '-', match[5]].join('');
  }

  return '';
};