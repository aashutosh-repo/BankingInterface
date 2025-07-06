export interface SipYearlyData {
    year: number;
    investment: number;
    return: number;
    maturity: number;
}


export interface SipCalculationInput {
  sipAmount: number;
  stepUpPercentage: number;  // yearly increase in step-up
  investmentPeriod: number;  // in years
  expectedReturnRate: number; // annual %
  inflationRate?: number;     // optional
  sipType: SipType;
}

export type SipType = 'monthly' | 'stepup' | 'inflation';

export interface SipCalculationResult {
  totalInvestment: number;
  returns: number;
  totalReturn: number;
  futureValue: number
  futureValueReal: number;
  yearlyData: SipYearlyData[];
}