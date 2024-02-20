function generateRandomPrice(itemType) {
  let minPrice, maxPrice;
  if (itemType === 'car') {
      minPrice = 50000;
      maxPrice = 1000000;
  } else {
      minPrice = 10;
      maxPrice = 1000;
  }
  const randomFraction = Math.random();
  const randomPrice = Math.floor(randomFraction * (maxPrice - minPrice + 1)) + minPrice;
  return randomPrice;
}

function generateCarTitle(str1, str2) {
  return `${str1} ${str2}`;
}

function generateDescription(length = 300) {
  const loremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
  const repetitions = Math.ceil(length / loremIpsum.length);
  const description = Array(repetitions).fill(loremIpsum).join(" ").substring(0, length);
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
      console.log('Handling Furniture category.');
      break;
    case 'apparel':
      extraField = generateRandomSize();
      console.log('Handling Clothing & Accessories category.');
      break;
    case 'electronics':
      console.log('Handling Electronics category.');
      break;
    case 'tools & equipement':
      console.log('Handling Electronics category.');
      break;
    case 'bag & luggage':
      console.log('Handling Electronics category.');
      break;
    case 'games & toys':
      console.log('Handling Electronics category.');
      break;
    default:
      console.log(`Category '${normalizedInput}' is not recognized.`);
  }
  return extraField;
}

function generateRandomSize() {
  const sizes = ["XS", "S", "M", "L", "XL"];
  const randomIndex = Math.floor(Math.random() * sizes.length);
  return sizes[randomIndex];
}

function generateRandomCondition() {
  const conditions = ["used", "fair", "new"];
  const randomIndex = Math.floor(Math.random() * conditions.length);
  return conditions[randomIndex];
}