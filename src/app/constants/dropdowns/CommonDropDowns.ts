export const DOCUMENTS_TYPES: string[] = [
'Aadhaar Card',
'Passport',
'Driving License',
'PAN Card',
'Voter ID',
'Ration Card',
'Bank Account Passbook',
'Post Office ID Card'
];

export const RATING_AGENCIES: string[] = [
    'CIBIL',
    'MOODY',
    'CRISIL',
    'S&P',
    'FITCH',
    'ICRA',
    'CARE',
    'BRICKWORK',
    'SME Rating Agency'
    ];
export const RISK_PROFILE: string[] = ['High', 'Medium', 'Low'];
export const CUSTOMER_STATUS: string[] = ['Active', 'Inactive', 'Pending', 'Closed'];

export interface CustomerTypeOption {
    label: string;
    value: string;
  }
export const CUSTOMER_TYPE_OPTIONS: CustomerTypeOption[] = [
    { label: 'Individual', value: '1' },
    { label: 'MSME', value: '2' },
    { label: 'Corporate', value: '3' },
    { label: 'Others', value: '4' },
  ];
