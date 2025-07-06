import { Injectable } from "@angular/core";
import { SipCalculationInput, SipCalculationResult, SipYearlyData } from "../../model/interfaces/instruments/instrument.model";


@Injectable({ providedIn: 'root' })
export class SipCalculatorService {

    yearlyData: SipYearlyData[] = [];
    totalInvestment = 0;
    returns = 0;
    totalReturn!: number;
    
  calculateStepUpSip(
    baseMonthlyInvestment: number,
    annualIncreaseRatePercent: number,
    totalYears: number,
    annualReturnRatePercent: number
  ): {
    totalInvestment: number;
    returns: number;
    totalReturn: number;
    futureValue: number;
    yearlyData: SipYearlyData[];
  } {
    const months = totalYears * 12;
    const monthlyRate = annualReturnRatePercent / 12 / 100;
    const annualIncreaseRate = annualIncreaseRatePercent / 100;

    let futureValue = 0;
    let totalInvestment = 0;
    let returns = 0;
    const yearlyData: SipYearlyData[] = [];

    let yearlyInvestment = 0;
    let yearlyReturn = 0;
    const yearStart = new Date().getFullYear();

    for (let month = 1; month <= months; month++) {
      const yearsPassed = Math.floor((month - 1) / 12);
      const monthsUntilNow = month;
      const stepUpAmount =
        baseMonthlyInvestment * Math.pow(1 + annualIncreaseRate, yearsPassed);
      const compoundedAmount =
        stepUpAmount * Math.pow(1 + monthlyRate, monthsUntilNow);
      futureValue += compoundedAmount;
      totalInvestment += stepUpAmount;
      returns += compoundedAmount - stepUpAmount;

      yearlyInvestment += stepUpAmount;
      yearlyReturn += compoundedAmount - stepUpAmount;

      if (month % 12 === 0) {
        const year = yearStart + yearsPassed;
        yearlyData.push({
          year: year,
          investment: Math.round(totalInvestment),
          return: Math.round(returns),
          maturity: Math.round(totalInvestment + returns),
        });
      }
    }

    const totalReturn = Math.round(totalInvestment + returns);
    return {
      totalInvestment,
      returns,
      totalReturn,
      futureValue: Math.round(futureValue),
      yearlyData,
    };
  }
  
  calculateSipWithInflation(input: SipCalculationInput): SipCalculationResult {

    const months = input.investmentPeriod * 12;
  const annualIncrease = input.stepUpPercentage / 100;
  const inflationRate = (input.inflationRate ?? 0) / 100;
  const monthlyNominalRate = input.expectedReturnRate / 12 / 100;

  let futureValue = 0;
  let totalInvestment = 0;
  let totalReturn = 0;
  const yearlyData: SipYearlyData[] = [];

  const yearStart = new Date().getFullYear();

  for (let month = 1; month <= months; month++) {
    const yearsPassed = Math.floor((month - 1) / 12);
    const monthlySIP = input.sipAmount * Math.pow(1 + annualIncrease, yearsPassed);
    const compounded = monthlySIP * Math.pow(1 + monthlyNominalRate, months - month + 1);

    futureValue += compounded;
    totalInvestment += monthlySIP;
    totalReturn += compounded - monthlySIP;

    if (month % 12 === 0) {
      yearlyData.push({
        year: yearStart + yearsPassed,
        investment: Math.round(totalInvestment),
        return: Math.round(totalReturn),
        maturity: Math.round(totalInvestment + totalReturn),
      });
    }
  }

  const futureValueReal = input.inflationRate
    ? futureValue / Math.pow(1 + inflationRate, input.investmentPeriod)
    : futureValue;

  return {
    futureValue: Math.round(futureValue),
    futureValueReal: Math.round(futureValueReal),
    totalInvestment: Math.round(totalInvestment),
    returns: Math.round(totalReturn),
    totalReturn: Math.round(totalInvestment + totalReturn),
    yearlyData,
  };

    
  }
}