export interface Account {
    accountId: any;
    internalAcntNumber: string;
    account_status: number;
    account_number: string;
    account_open_dt: string;
    currency: string;
    cust_id: number;
    cus_type: number;
    npa_status: number;
    min_bal: number;
    last_withdrawal_dt: string;
    available_balance: number;
    owner_name: string;
    atm_req_flag: number;
    cheq_req_flag: number;
    sms_req_flag: number;
    clsr_dt: string;
    clsr_reason: string;
  }
  