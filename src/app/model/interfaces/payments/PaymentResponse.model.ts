export interface PaymentStatusResponse {
  transactionId: string;
  gateway: string;
  status: string;
  amount: string;
  method: string;
  referenceId: string;
  message: string;
  paidAt: string;
}