import { FmcsaApiError } from "@/errors/fmcsa.js";
import type { CarrierData, DocketNumberResponse, DotNumberResponse } from "@/types/fmcsa.ts";
import logger from "@/utils/logger.js";

const { FMCSA_API_WEB_KEY, FMCSA_API_URL } = process.env

export async function fmcsaFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(`${FMCSA_API_URL}${endpoint}`);
    // Add the web key to the query string of the URL
    url.searchParams.append('webKey', FMCSA_API_WEB_KEY!);
    
    try {
      const response = await fetch(url.toString(), options);
      
      if (!response.ok) {
        const errorText = (await response.json()).content

        throw new FmcsaApiError(`FMCSA API error: ${response.status} ${response.statusText} - ${errorText}`);
      }
      
      return await response.json() as T
    } catch (error) {
      logger.error('[SV-FMCSA] Error fetching from FMCSA API:', error.message);
      throw error;
    }
}


interface CheckUsdotNumberParams {
    usdotNumber: string
}

export async function getDocketNumberFromDotNumber({ usdotNumber }: CheckUsdotNumberParams): Promise<number> {
    logger.info('[SV-FMCSA] Getting docket number from usdot number');
    try {
        const response = await fmcsaFetch<DotNumberResponse>(`/${usdotNumber}/docket-numbers`);
        logger.info('[SV-FMCSA] Successfully fetched dot number from docket number');
        const docketNumber = response.content[0].docketNumber;
        return docketNumber
    } catch (error) {
        logger.error('[SV-FMCSA] Error fetching docket number from DOT number', error);
        throw new FmcsaApiError('Error fetching docket number from DOT number'); 
    }
}

interface CheckDocketNumberParams {
    docketNumber: string
}

export async function getCarrierData({ docketNumber }: CheckDocketNumberParams): Promise<CarrierData> {
    logger.info('[SV-FMCSA] Verifying if the carrier exists');
    try {
        const response = await fmcsaFetch<DocketNumberResponse>(`/docket-number/${docketNumber}`);
        logger.info('[SV-FMCSA] Successfully fetched carrier data');
        const carrier = {
            carrier_name: response.content[0].carrier.legalName,
            status: response.content[0].carrier.allowedToOperate === 'Y' ? 'Active' : 'Inactive', // we assume that if the carrier is not allowed to operate, it is inactive
            dot_number: response.content[0].carrier.dotNumber,
            mc_number: Number(docketNumber)
        }
        return carrier
    } catch (error) {
        logger.error('[SV-FMCSA] Error fetching carrier information from FMCSA API', error);
        throw new FmcsaApiError('Error fetching carrier information from FMCSA API');
    }
}
