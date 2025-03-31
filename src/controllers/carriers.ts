import type { Request, Response } from 'express'
import { getCarrierData, getDocketNumberFromDotNumber } from '@/services/fmcsa.js';
import logger from '@/utils/logger.js';
import { ERRORS } from '@/utils/constants.js';
import { FmcsaApiError } from '@/errors/fmcsa.js';

export async function verifyCarrier(req: Request, res: Response): Promise<void> {
    logger.info('[CT-CARRIERS] Verifying number provided');
    try {
        // Destructure the query parameters
        const { mc, dot } = req.query;
        // In case we get the DOT number, we need the MC number
        const number = mc != null 
            ? mc as string
            : await getDocketNumberFromDotNumber({ usdotNumber: dot as string });
        
        const response = await getCarrierData({ docketNumber: number as string })
        logger.info('[CT-CARRIERS] Successfully fetched carrier data');
        res.status(200).json({
            status: 200,
            carrier: response
        });
    } catch (error) {
        logger.error('[CT-CARRIERS] Error fetching carrier information', error.message);
        if (error instanceof FmcsaApiError) {
            res.status(404).json({
                status: 404,
                error: ERRORS.CARRIER_NOT_FOUND
            });
            return;
        }
        res.status(500).json({
            status: 500,
            error: ERRORS.CARRIER_INTERNAL_SERVER_ERROR
        });
    }
}