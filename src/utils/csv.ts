import fs from 'fs';
import csv from 'csv-parser';

interface Load {
    reference_number: string;
    origin: string;
    destination: string;
    equipment_type: string;
    rate: number;
    commodity: string;
}

export async function readCSVFile(filePath: string): Promise<Load[]> {
    return new Promise((resolve, reject) => {
        const results: Load[] = [];
        fs.createReadStream(filePath)
            .pipe(csv({ separator: '|' }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (error) => reject(new Error(`Error reading CSV file: ${error.message}`)));
    });
}