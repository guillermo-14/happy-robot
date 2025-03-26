import type { DocketNumberResponse, DotNumberResponse, FmcsaResponse } from "../types/fmcsa";

const { FMCSA_API_WEB_KEY, FMCSA_API_URL } = process.env

export async function fmcsaFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = new URL(`${FMCSA_API_URL}${endpoint}`);
    
    // Add the web key to the query string of the URL
    url.searchParams.append('webKey', FMCSA_API_WEB_KEY!);
    
    try {
      const response = await fetch(url.toString(), options);
      
      if (!response.ok) {
        throw new Error(`FMCSA API error: ${response.status} ${response.statusText}`);
      }
      
      return await response.json() as T
    } catch (error) {
      console.error('Error fetching from FMCSA API:', error);
      throw error;
    }
}


interface CheckUsdotNumberParams {
    usdotNumber: string
}

export async function checkUsdotNumber({ usdotNumber }: CheckUsdotNumberParams): Promise<FmcsaResponse<DotNumberResponse>> {
    console.log('[SV] Verifying usdot number');
    try {
        const response = await fmcsaFetch<DotNumberResponse>(`/${usdotNumber}`);
        const allowedToOperate = response.content.carrier.allowedToOperate;
        console.log('[SV] Successfully fetched usdot number');

        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.log('Error desde checkUsdotNumber', error)
        return {
            success: false,
            error
        }
    }
}

interface CheckDocketNumberParams {
    docketNumber: string
}

export async function checkDocketNumber({ docketNumber }: CheckDocketNumberParams): Promise<FmcsaResponse<DocketNumberResponse>> {
    console.log('[SV] Verifying docket number');
    try {
        const response = await fmcsaFetch<DocketNumberResponse>(`/docket-number/${docketNumber}`);
        console.log('[SV] Successfully fetched docket number');
        return {
            success: true,
            data: response
        }
    } catch (error) {
        console.log('Error desde checkDocketNumber', error)
        return {
            success: false,
            error
        }
    }
}