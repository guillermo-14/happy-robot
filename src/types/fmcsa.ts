export interface CarrierData {
    carrier_name: string
    status: string
    dot_number: number
    mc_number: number
}

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
}

export interface FmcsaLinks {
    basics?: { href: string };
    "cargo carried"?: { href: string };
    "operation classification"?: { href: string };
    "docket numbers"?: { href: string };
    "carrier active-For-hire authority"?: { href: string };
    self?: { href: string };
    [key: string]: { href: string } | undefined;
}

interface DocketOverview {
    docketNumber: number;
    docketNumberId: number;
    dotNumber: number;
    prefix: string;
}

export interface DotNumberResponse {
    content: DocketOverview[];
    _links: FmcsaLinks;
    retrievalDate: string;
}

export interface DocketNumberResponse {
    content: Array<{
        _links: FmcsaLinks;
        carrier: Carrier;
    }>;
    retrievalDate: string;
}
