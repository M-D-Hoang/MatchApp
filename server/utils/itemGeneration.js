export function generateCarRandomPrice() {
  const minPrice = 50000;
  const maxPrice = 1000000;

  const randomFraction = Math.random();
  const randomPrice = Math.floor(randomFraction * (maxPrice - minPrice + 1)) + minPrice;
  return randomPrice;
}

export function generateCarTitle(str1, str2) {
  return `${str1} ${str2}`;
}

export function generateDescription(length = 300) {
  const loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';
  const repetitions = Math.ceil(length / loremIpsum.length);
  const description = Array(repetitions).fill(loremIpsum).join(' ').substring(0, length);
  return description;
}

export function generateMiles() {
  const minMiles = 30000;
  const maxMiles = 120000;
  const randomMiles = Math.floor(Math.random() * (maxMiles - minMiles + 1)) + minMiles;
  return randomMiles;
}

export function handleCategory(input) {
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

export function generateRandomSize() {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
}

export function generateRandomCondition() {
  const conditions = ['used', 'fair', 'new'];
  const randomIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randomIndex];
}