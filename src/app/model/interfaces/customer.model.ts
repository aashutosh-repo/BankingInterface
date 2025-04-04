export type Root = CustomerDetails[]

export interface CustomerDetails {
  customerCategory:string
  firstName: string
  lastName: string
  fatherName: string
  motherName: string
  mail: string
  mobileNumber: string
  status: number
  dateOfBirth: number[]
  onboardingDate: any
  custClsngDt: any
  riskProfile: number
  ratingAgency: string
}