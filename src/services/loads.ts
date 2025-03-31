import { Load } from "@/types/loads.js";
import { getLoadedData } from "@/utils/loadData.js";
import logger from "@/utils/logger.js";

interface GetLoadParams {
    reference_number: string;
}

export async function getLoadByReferenceNumber({ reference_number }: GetLoadParams): Promise<Load[]> {
    logger.info('[SV-LOADS] Getting load by reference number');
    try {
        const results = getLoadedData()
        const load = results.find(load => load.reference_number === reference_number);
        if (load) {
            logger.info('[SV-LOADS] Successfully fetched load');
            return [load];
        } else {
            logger.info('[SV-LOADS] Load not found');
            return []
        }
    } catch (error) {
        logger.error('[SV-LOADS] Error fetching load by reference number:', error.message);
        return [];
    }
}

interface GetLoadsParams {
    origin: string;
    destination?: string;
    equipment_type?: string;
    commodity?: string;
}

export async function getLoadsWithMultipleCriteria(params: GetLoadsParams): Promise<Load[]> {
    logger.info('[SV-LOADS] Getting loads with multiple criteria');
    try {
        const results = getLoadedData();
        const filteredLoads = results.filter(load => {
            const normalize = (str: string) => str.trim().toLowerCase();
            const contains = (full: string, search: string) => normalize(full).includes(normalize(search));

            return (!params.origin || contains(load.origin, params.origin)) &&
                   (!params.destination || contains(load.destination, params.destination)) &&
                   (!params.equipment_type || contains(load.equipment_type, params.equipment_type)) &&
                   (!params.commodity || contains(load.commodity, params.commodity));
        });

        if (filteredLoads.length > 0) {
            logger.info('[SV-LOADS] Successfully fetched loads');
            return filteredLoads;
        } else {
            logger.info('[SV-LOADS] No loads found');
            return []
        }
    } catch (error) {
        logger.error('[SV-LOADS] Error fetching loads with criteria:', error);
        return []
    }
}
