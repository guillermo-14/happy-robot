import type { Request, Response } from 'express'
import { getLoadByReferenceNumber, getLoadsWithMultipleCriteria } from '@/services/loads.js';
import { ERRORS } from '@/utils/constants.js';
import logger from '@/utils/logger.js';

export async function getLoads(req: Request, res: Response): Promise<void> {
    logger.info('[CT-LOADS] Getting loads with the provided criteria');
    try {
        const { reference_number, origin, destination, equipment_type, commodity } = req.query;
        // If the reference number is provided we will get the load by reference number
        // Otherwise we will get the loads with multiple criteria
        const response = reference_number 
            ? await getLoadByReferenceNumber({ reference_number: reference_number as string })
            : await getLoadsWithMultipleCriteria({
                origin: origin as string,
                destination: destination as string,
                equipment_type: equipment_type as string,
                commodity: commodity as string
            });
        logger.info('[CT-LOADS] Successfully fetched loads');
        // If the response is empty we will return a 404
        if (response.length === 0) {
            res.status(404).json({
                status: 404,
                error: ERRORS.LOAD_NOT_FOUND
            });
        } else {
            res.status(200).json({
                status: 200,
                loads: response
            });
        }
    } catch (error) {
        logger.error('[CT-LOADS] Error getting loads', error.message);
        res.status(500).json({
            status: 500,
            error: ERRORS.FETCH_LOADS_INTERNAL_SERVER_ERROR
        });
    }
}