import { DropDownTemplete } from "./Templetes";

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
  export const RISK_PROFILE_OPTIONS = [
    { label: 'High', value: '1' },
    { label: 'Medium', value: '2' },
    { label: 'Low', value: '3' }
  ];

export const ADDRESS_TYPE = [
  {label: 'Permanent', value:'1'},
  {label:'Temporary', value:'2'}, 
  {label: 'Office', value: '3'},
];

export const CUSTOMER_ELIGIBILITY_TYPES =[
  {label: 'Major', value:'101'},
  {label:'Minor', value:'102'},
  {label: 'HUF', value:'103'},
  {label: 'Partnership', value:'104'},
  {label: 'LLP', value:'105'},
]
  
  export const CUSTOMER_STATUS: string[] = ['Active', 'Inactive', 'Pending', 'Closed'];


export const CUSTOMER_TYPE_OPTIONS: DropDownTemplete[] = [
    { label: 'Individual', value: '1' },
    { label: 'MSME', value: '2' },
    { label: 'Corporate', value: '3' },
    { label: 'Others', value: '4' },
  ];

  export const CUSTOMER_CATEGORY_OPTIONS: DropDownTemplete[] = [
    { label: 'Silver', value: '1' },
    { label: 'Gold', value: '2' },
    { label: 'Platinum', value: '3' },
    { label: 'Diamond', value: '4' },
  ];

  export const CUSTOMER_STATUS_OPTIONS: DropDownTemplete[] = [
    { label: 'Active', value: '1' },
    { label: 'Closed', value: '2' },
    { label: 'Pending approval', value: '3' },
    { label: 'NA', value: '4' },
  ];