// src/app/shared/constants/customer-status.constants.ts

export enum CustomerStatusCode {
    ACTIVE = 1,
    INACTIVE = 2,
    IN_PROGRESS = 3,
    PENDING_AUTH = 4,
    REJECTED = 5
  }
  
  export const CUSTOMER_STATUS_OPTIONS: DropdownOption[] = [
    { label: 'Active', value: '1' },
    { label: 'InActive', value: '2' },
    { label: 'In Progress', value: '3' },
    { label: 'Pendig Auth', value: '4' },
    { label: 'Rejected', value: '5' },
  ];
  export interface DropdownOption {
    label: string;
    value: string;
  }