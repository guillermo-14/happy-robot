// types/fmcsa.ts

// Parámetros para las funciones
export interface FmcsaParams {
    usdotNumber?: string;
    docketNumber?: string;
}

// Respuesta genérica
export interface FmcsaResponse<T> {
    success: boolean;
    data?: T;
    error?: any;
}

// Estructura común del carrier que aparece en ambas respuestas
export interface Carrier {
    allowedToOperate: string;
    bipdInsuranceOnFile: string;
    bipdInsuranceRequired: string;
    bipdRequiredAmount: string;
    bondInsuranceOnFile: string;
    bondInsuranceRequired: string;
    brokerAuthorityStatus: string;
    cargoInsuranceOnFile: string;
    cargoInsuranceRequired: string;
    carrierOperation: {
        carrierOperationCode: string;
        carrierOperationDesc: string;
    };
    censusTypeId: {
        censusType: string;
        censusTypeDesc: string;
        censusTypeId: number;
    };
    commonAuthorityStatus: string;
    contractAuthorityStatus: string;
    crashTotal: number;
    dbaName?: string;
    dotNumber: number;
    driverInsp: number;
    driverOosInsp: number;
    driverOosRate: number;
    driverOosRateNationalAverage: string;
    ein: number;
    fatalCrash: number;
    hazmatInsp: number;
    hazmatOosInsp: number;
    hazmatOosRate: number;
    hazmatOosRateNationalAverage: string;
    injCrash: number;
    isPassengerCarrier: string | null;
    issScore: null;
    legalName: string;
    mcs150Outdated: string;
    oosDate: null;
    oosRateNationalAverageYear: string;
    phyCity: string;
    phyCountry: string;
    phyState: string;
    phyStreet: string;
    phyZipcode: string;
    reviewDate: string;
    reviewType: string;
    safetyRating: string;
    safetyRatingDate: string;
    safetyReviewDate: string;
    safetyReviewType: string;
    snapshotDate: null;
    statusCode: string;
    totalDrivers: number;
    totalPowerUnits: number;
    towawayCrash: number;
    vehicleInsp: number;
    vehicleOosInsp: number;
    vehicleOosRate: number;
    vehicleOosRateNationalAverage: string;
    [key: string]: any; // Para otros campos que puedan aparecer
}

// Estructura de links común
export interface FmcsaLinks {
    basics?: { href: string };
    "cargo carried"?: { href: string };
    "operation classification"?: { href: string };
    "docket numbers"?: { href: string };
    "carrier active-For-hire authority"?: { href: string };
    self?: { href: string };
    [key: string]: { href: string } | undefined;
}

// Respuesta para DOT Number
export interface DotNumberResponse {
    content: {
        _links: FmcsaLinks;
        carrier: Carrier;
    };
    retrievalDate: string;
}

// Respuesta para MC Number (Docket Number)
export interface DocketNumberResponse {
    content: Array<{
        _links: FmcsaLinks;
        carrier: Carrier;
    }>;
    retrievalDate: string;
}
