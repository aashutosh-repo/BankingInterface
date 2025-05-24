export type TransactionType = 'card' | 'UPI' | 'QR' | 'Net_banking' | 'Wallet' | 'EMI';

export interface Transaction {
  transaction_type: TransactionType;
  amount: number;
  year: number;
}
export interface FilterCriteria {
  startDate?: Date;
  endDate?: Date;
  transactionType?: TransactionType;
  region?: string;
}

export const TRANSACTION_DATA: Transaction[] = [
  { transaction_type: 'card', amount: 1390, year: 2021 },
  { transaction_type: 'UPI', amount: 2140, year: 2019 },
  { transaction_type: 'QR', amount: 720, year: 2022 },
  { transaction_type: 'Net_banking', amount: 1850, year: 2024 },
  { transaction_type: 'UPI', amount: 1760, year: 2023 },
  { transaction_type: 'card', amount: 1920, year: 2022 },
  { transaction_type: 'QR', amount: 860, year: 2021 },
  { transaction_type: 'Net_banking', amount: 1430, year: 2024 },
  { transaction_type: 'UPI', amount: 2550, year: 2022 },
  { transaction_type: 'card', amount: 1200, year: 2023 },

  { transaction_type: 'card', amount: 1600, year: 2021 },
  { transaction_type: 'UPI', amount: 2000, year: 2022 },
  { transaction_type: 'QR', amount: 880, year: 2024 },
  { transaction_type: 'Net_banking', amount: 2100, year: 2022 },
  { transaction_type: 'UPI', amount: 2300, year: 2021 },
  { transaction_type: 'card', amount: 1650, year: 2023 },
  { transaction_type: 'UPI', amount: 1870, year: 2024 },
  { transaction_type: 'QR', amount: 570, year: 2022 },
  { transaction_type: 'Net_banking', amount: 2950, year: 2021 },
  { transaction_type: 'card', amount: 990, year: 2024 },

  { transaction_type: 'UPI', amount: 2480, year: 2023 },
  { transaction_type: 'QR', amount: 790, year: 2022 },
  { transaction_type: 'Net_banking', amount: 2600, year: 2021 },
  { transaction_type: 'card', amount: 1310, year: 2022 },
  { transaction_type: 'UPI', amount: 1800, year: 2021 },
  { transaction_type: 'QR', amount: 640, year: 2023 },
  { transaction_type: 'Net_banking', amount: 2750, year: 2024 },
  { transaction_type: 'card', amount: 1170, year: 2023 },
  { transaction_type: 'UPI', amount: 2450, year: 2022 },
  { transaction_type: 'QR', amount: 950, year: 2024 },

  { transaction_type: 'Net_banking', amount: 2010, year: 2021 },
  { transaction_type: 'card', amount: 1780, year: 2022 },
  { transaction_type: 'UPI', amount: 1920, year: 2023 },
  { transaction_type: 'QR', amount: 820, year: 2022 },
  { transaction_type: 'Net_banking', amount: 2690, year: 2024 },
  { transaction_type: 'card', amount: 1090, year: 2021 },
  { transaction_type: 'UPI', amount: 2130, year: 2024 },
  { transaction_type: 'QR', amount: 740, year: 2023 },
  { transaction_type: 'Net_banking', amount: 1580, year: 2022 },
  { transaction_type: 'card', amount: 1430, year: 2023 },

  { transaction_type: 'UPI', amount: 2680, year: 2021 },
  { transaction_type: 'QR', amount: 870, year: 2024 },
  { transaction_type: 'Net_banking', amount: 2200, year: 2023 },
  { transaction_type: 'card', amount: 1320, year: 2022 },
  { transaction_type: 'UPI', amount: 2560, year: 2021 },
  { transaction_type: 'QR', amount: 910, year: 2023 },
  { transaction_type: 'Net_banking', amount: 2740, year: 2022 },
  { transaction_type: 'card', amount: 1250, year: 2024 },
  { transaction_type: 'UPI', amount: 1990, year: 2023 },
  { transaction_type: 'QR', amount: 630, year: 2021 },

  { transaction_type: 'Net_banking', amount: 2890, year: 2024 },
  { transaction_type: 'card', amount: 1100, year: 2022 },
  { transaction_type: 'UPI', amount: 2200, year: 2021 },
  { transaction_type: 'QR', amount: 920, year: 2023 },
  { transaction_type: 'Net_banking', amount: 2660, year: 2022 },
  { transaction_type: 'card', amount: 1520, year: 2023 },
  { transaction_type: 'UPI', amount: 1700, year: 2024 },
  { transaction_type: 'QR', amount: 880, year: 2021 },
  { transaction_type: 'Net_banking', amount: 2430, year: 2023 },
  { transaction_type: 'card', amount: 1300, year: 2024 },

  { transaction_type: 'UPI', amount: 2270, year: 2022 },
  { transaction_type: 'QR', amount: 960, year: 2021 },
  { transaction_type: 'Net_banking', amount: 2550, year: 2023 },
  { transaction_type: 'card', amount: 1480, year: 2022 },
  { transaction_type: 'UPI', amount: 2010, year: 2024 },
  { transaction_type: 'QR', amount: 660, year: 2023 },
  { transaction_type: 'Net_banking', amount: 2180, year: 2021 },
  { transaction_type: 'card', amount: 1410, year: 2023 },
  { transaction_type: 'UPI', amount: 2440, year: 2022 },
  { transaction_type: 'QR', amount: 830, year: 2024 },

  { transaction_type: 'Net_banking', amount: 2670, year: 2023 },
  { transaction_type: 'card', amount: 1220, year: 2021 },
  { transaction_type: 'UPI', amount: 1900, year: 2023 },
  { transaction_type: 'QR', amount: 740, year: 2022 },
  { transaction_type: 'Net_banking', amount: 2810, year: 2024 },
  { transaction_type: 'card', amount: 1360, year: 2022 },
  { transaction_type: 'UPI', amount: 2160, year: 2021 },
  { transaction_type: 'QR', amount: 900, year: 2023 },
  { transaction_type: 'Net_banking', amount: 2620, year: 2022 },
  { transaction_type: 'card', amount: 1190, year: 2024 },

  { transaction_type: 'Wallet', amount: 2670, year: 2023 },
  { transaction_type: 'Wallet', amount: 1220, year: 2021 },
  { transaction_type: 'Wallet', amount: 1900, year: 2023 },
  { transaction_type: 'Wallet', amount: 740, year: 2022 },
  { transaction_type: 'Wallet', amount: 2810, year: 2024 },
  { transaction_type: 'EMI', amount: 1360, year: 2022 },
  { transaction_type: 'EMI', amount: 2160, year: 2021 },
  { transaction_type: 'EMI', amount: 900, year: 2023 },
  { transaction_type: 'EMI', amount: 2620, year: 2022 },
  { transaction_type: 'EMI', amount: 1190, year: 2022 },
  { transaction_type: 'EMI', amount: 1190, year: 2022 },
  { transaction_type: 'EMI', amount: 1190, year: 2022 },
  { transaction_type: 'EMI', amount: 1190, year: 2024 }
]
