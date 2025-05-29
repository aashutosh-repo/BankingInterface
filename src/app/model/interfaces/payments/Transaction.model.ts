export interface TransactionResponse {
  transactionId: string
  customerId: string
  accountNumber: string
  transactionType: string
  transactionMode: string
  transactionAmount: number
  currency: string
  transactionFee: number
  gstAmount: number
  netAmount: number
  transactionStatus: string
  transactionDatetime: number[]
  merchantName: string
  channel: string
  fraudFlag: boolean
}