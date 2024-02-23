export function generateRandomUsername(prefix = 'user') {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}`;
}

export function generateRandomPassword(
  length = 12, includeUppercase = true, includeLowercase = true,
  includeNumbers = true, includeSpecialChars = true) {
  const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
  const numberChars = '0123456789';
  const specialChars = '!@#$%^&*()_+[]{}|;:,.<>?';

  let allChars = '';
  let password = '';

  if (includeUppercase) allChars += uppercaseChars;
  if (includeLowercase) allChars += lowercaseChars;
  if (includeNumbers) allChars += numberChars;
  if (includeSpecialChars) allChars += specialChars;

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars.charAt(randomIndex);
  }

  return password;
}

export function generateRandomEmail() {
  const localPartLength = 8;
  const domain = ['outlook.com', 'gmail.com', 'hotmail.com', 'yahoo.com'];

  const getRandomString = (length) => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }
    return result;
  };

  const localPart = getRandomString(localPartLength);
  const randomDomain = domain[Math.floor(Math.random() * domain.length)];

  return `${localPart}@${randomDomain}`;
}

export function generateRandomPhoneNumber() {
  const getRandomDigit = () => Math.floor(Math.random() * 10);

  // Modify the country code as needed
  const countryCode = '+1';
  const areaCode = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const firstPart = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const secondPart = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;

  return `${countryCode} (${areaCode}) ${firstPart}-${secondPart}`;
}

export function getRandomMonth() {
  return Math.floor(Math.random() * 12) + 1;
}

export function getRandomDay(month, year) {
  const daysInMonth = new Date(year, month, 0).getDate();
  const randomDay = Math.floor(Math.random() * daysInMonth) + 1;

  const formattedMonth = month < 10 ? '0' + month : month;
  const formattedDay = randomDay < 10 ? '0' + randomDay : randomDay;

  return `${formattedMonth}/${formattedDay}/${year}`;
}

export function getRandomYear() {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  return Math.floor(Math.random() * (currentYear - minYear + 1)) + minYear;
}
