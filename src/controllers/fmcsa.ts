import type { Request, Response } from 'express'
import { checkDocketNumber, checkUsdotNumber } from '../services/fmcsa';

export async function verifyNumber(req: Request, res: Response): Promise<void> {
    console.log('[CT] Verifying number');
    try {
        const { mc_number, usdot_number } = req.query;
        const response = mc_number !== null ? await checkDocketNumber({ docketNumber: mc_number as string }) : await checkUsdotNumber({ usdotNumber: usdot_number as string });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({
            success: false,
            error
        });
    }
}