
export type Root = CustomerDetails[]

export interface CustomerDetails {
    customerId: string
    customerType: string
    customerCategory:string
    firstName: string
    lastName: string
    fatherName: string
    motherName: string
    mail: string
    mobileNumber: string
    status: number
    dateOfBirth: string
    onboardingDate: string
    custClsngDt: string
    riskProfile: number
    ratingAgency: string
}

export interface CustomerAddress {
    customerID: number
    addressType: number
    addressLn1: string
    addressLn2: string
    city: string
    village: string
    district: string
    taluka: string
    state: string
    pinCode: number
    lastUpdate: string
    dateOfCapture: string
  }

  export interface documentDetails {
    custId: number
    docDescription: string
    docIdentificationNumber: string
    docType: string
    docTypeCode: string
    issueDate: string
    expiryDate: string
  }

  export interface NomineeDetails {
    ownerId: number
    nomineeRefNum: number
    ownerType: number
    seqNum: number
    nomShare: number
    nomType: number
    nomTypeCode: number
    nomineeFirstName: string
    nomineeMiddleName: string
    nomineeLastName: string
    rtlnType: number
    rtlnTypeCode: number
    dateOfBirth: string
    nomAddId: number
    nomDocId: string
    ver: number
  }

export interface CustomerData {
  customerDetails: CustomerDetails | null;
  addressDetails: CustomerAddress | null;
  documentDetails: documentDetails | null;
  nomineeDetails: NomineeDetails[] | null;
}