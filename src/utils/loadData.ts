import { Load } from "@/types/loads.js";
import { readCSVFile } from "@/utils/csv.js";
import logger from "./logger.js";

let loadsData: Load[] = [];

// Loads the CSV file into memory
// This function is called when the server starts
// and loads the data into memory for faster access
export async function loadData() {
    try {
        loadsData = await readCSVFile('./db/loads.csv');
        logger.info('Data successfully loaded into memory');
    } catch (error) {
        logger.error('Error loading data into memory:', error.message);
    }
}

// Returns the loaded data
export function getLoadedData(): Load[] {
    return loadsData;
}
