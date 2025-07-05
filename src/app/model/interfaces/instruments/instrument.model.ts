export interface SIP{
    year: number;
    investment: number;
    return: number;
    maturity: number;
}

export class SipCalculatorComponent {
  selectedSipType: 'monthly' | 'stepup' | 'inflation' = 'monthly';
}
