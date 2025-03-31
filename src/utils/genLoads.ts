import fs from 'fs';
import path from 'path';

const usCities = [
  'New York, NY', 'Los Angeles, CA', 'Chicago, IL', 'Houston, TX', 'Phoenix, AZ',
  'Philadelphia, PA', 'San Antonio, TX', 'San Diego, CA', 'Dallas, TX', 'San Jose, CA',
  'Austin, TX', 'Jacksonville, FL', 'Fort Worth, TX', 'Columbus, OH', 'Charlotte, NC',
  'San Francisco, CA', 'Indianapolis, IN', 'Seattle, WA', 'Denver, CO', 'Washington, DC'
];

const generateRandomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const equipmentTypes = ['Dry Van', 'Flatbed', 'Refrigerated'];
const commodities = ['Automotive Parts', 'Agricultural Products', 'Industrial Equipment', 'Electronics', 'Furniture'];


const generateUniqueReferenceNumber = (existingRefs) => {
  let referenceNumber;
  do {
    referenceNumber = `REF${generateRandomNumber(10000, 99999)}`;
  } while (existingRefs.has(referenceNumber));
  existingRefs.add(referenceNumber);
  return referenceNumber;
};

const generateRandomLoad = (existingRefs) => {
  const referenceNumber = generateUniqueReferenceNumber(existingRefs);
  const origin = usCities[generateRandomNumber(0, usCities.length - 1)];
  let destination;
  do {
    destination = usCities[generateRandomNumber(0, usCities.length - 1)];
  } while (destination === origin); // Asegurar que origen y destino no sean iguales
  const equipmentType = equipmentTypes[generateRandomNumber(0, equipmentTypes.length - 1)];
  const rate = generateRandomNumber(500, 2000);
  const commodity = commodities[generateRandomNumber(0, commodities.length - 1)];

  return `${referenceNumber}|${origin}|${destination}|${equipmentType}|${rate}|${commodity}`;
};

const generateCSV = (numRecords) => {
  const header = 'reference_number|origin|destination|equipment_type|rate|commodity';
  const records = [header];
  const existingRefs = new Set();

  for (let i = 0; i < numRecords; i++) {
    records.push(generateRandomLoad(existingRefs));
  }

  return records.join('\n');
};

const saveCSVToFile = (filename, data) => {
  fs.writeFileSync(path.join('.', filename), data, 'utf8');
  console.log(`CSV file has been saved as ${filename}`);
};

// Generate a CSV with 50 records
const csvData = generateCSV(1000);
saveCSVToFile('loads.csv', csvData);
