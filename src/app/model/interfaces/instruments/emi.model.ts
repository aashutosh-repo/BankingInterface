export interface emiCalculationInput {
    loanAmount: number; // Principal amount
    annualInterestRate: number; // Annual interest rate in percentage
    tenureInYears: number; // Tenure in months
    startDate: Date; // Start date of the loan
    repaymentFrequency: RepaymentFrequency; // Frequency of payments
}
export enum RepaymentFrequency {
    Monthly = 1,
    Quarterly = 3,
    HalfYearly = 6,
    Yearly = 12
}

export interface emiCalculationResult {
  totalPrincipal: number
  totalInterest: number
  totalAmountPayable: number
  monthlyEmi: number
}

export interface monthlyEmiData {
  monthNumber: number
  emi: number
  principalComponent: number
  interestComponent: number
  remainingBalance: number
}   

export interface EMIResponse {
    emiCalculationInput: emiCalculationInput;
    emiCalculationResult: emiCalculationResult;
    monthlyEmiData: monthlyEmiData[];
    errorId?: string;
    message?: string;
}