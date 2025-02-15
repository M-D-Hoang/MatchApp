function generateCarRandomPrice() {
  const minPrice = 50000;
  const maxPrice = 1000000;

  const randomFraction = Math.random();
  const randomPrice = Math.floor(randomFraction * (maxPrice - minPrice + 1)) + minPrice;
  return randomPrice;
}

function generateCarTitle(str1, str2) {
  return `${str1} ${str2}`;
}

function generateDescription(length = 300) {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const repetitions = Math.ceil(length / loremIpsum.length);
  const description = Array(repetitions).fill(loremIpsum).join(' ').substring(0, length);
  return description;
}

function generateMiles() {
  const minMiles = 30000;
  const maxMiles = 120000;
  const randomMiles = Math.floor(Math.random() * (maxMiles - minMiles + 1)) + minMiles;
  return randomMiles;
}

function handleCategory(input) {
  let extraField;
  const normalizedInput = input.trim().toLowerCase();
  switch (normalizedInput) {
  case 'furniture':
    extraField = 'none';
    break;
  case 'apparel':
    extraField = generateRandomSize();
    break;
  case 'electronics':
    extraField = 'none';
    break;
  case 'tools & equipement':
    extraField = 'none';
    break;
  case 'bag & luggage':
    extraField = 'none';
    break;
  case 'games & toys':
    extraField = 'none';
    break;
  default:
    extraField = 'none';
  }
  return extraField;
}

function generateRandomSize() {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
}

function generateRandomCondition() {
  const conditions = ['used', 'fair', 'new'];
  const randomIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randomIndex];
}

function generateRandomDate() {
  const today = new Date();
  const pastWeek = new Date(today);
  pastWeek.setDate(today.getDate() - 7);

  const randomTimestamp = 
  pastWeek.getTime() + Math.random() * (today.getTime() - pastWeek.getTime());
  const randomDate = new Date(randomTimestamp);

  const month = (randomDate.getMonth() + 1).toString().padStart(2, '0');
  const day = randomDate.getDate().toString().padStart(2, '0');
  const year = randomDate.getFullYear();

  return `${month}/${day}/${year}`;
}
function generateRandomPostalCode() {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';

  let postalCode = '';

  for (let i = 0; i < 6; i++) {
    if (i % 2 === 0) {
      const randomLetter = letters[Math.floor(Math.random() * letters.length)];
      postalCode += randomLetter;
    } else {
      const randomNumber = numbers[Math.floor(Math.random() * numbers.length)];
      postalCode += randomNumber;
    }
  }
  return postalCode;
}

module.exports = {
  generateCarRandomPrice,
  generateCarTitle,
  generateDescription,
  generateMiles,
  handleCategory,
  generateRandomSize,
  generateRandomCondition,
  generateRandomPostalCode,
  generateRandomDate,
};