function generateRandomUsername(prefix = 'user') {
  const randomNumber = Math.floor(Math.random() * 10000);
  return `${prefix}${randomNumber}`;
}

function generateRandomPassword(length = 12, includeUppercase = true, 
  includeLowercase = true, includeNumbers = true, includeSpecialChars = true) {
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

function generateRandomEmail() {
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

function generateRandomPhoneNumber() {
  const getRandomDigit = () => Math.floor(Math.random() * 10);
  
  const areaCode = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const firstPart = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;
  const secondPart = `${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}${getRandomDigit()}`;

  return `(${areaCode}) ${firstPart}-${secondPart}`;
}

function generateRandomBirthday() {
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 60;
  const maxYear = currentYear;

  const randomYear = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const randomMonth = Math.floor(Math.random() * 12) + 1;
  const randomDay = Math.floor(Math.random() * 28) + 1;
  const randomDate = new Date(randomYear, randomMonth - 1, randomDay);
  const formattedDate = randomDate.toISOString().split('T')[0];

  return formattedDate;
}

module.exports = {
  generateRandomUsername,
  generateRandomPassword,
  generateRandomEmail,
  generateRandomPhoneNumber,
  generateRandomBirthday
};