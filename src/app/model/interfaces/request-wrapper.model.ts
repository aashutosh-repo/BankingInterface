// Customer Basic Details
export interface CustomerDto {
    firstName: string;
    lastName: string;
    fatherName: string;
    motherName: string;
    mail: string;
    mobileNumber: string;
    status: number;
    dateOfBirth: string;
    onboardingDate: string;
    custClsngDt: string;
    riskProfile: number;
    ratingAgency: string;
  }
  
  // Document Details
  export interface DocDto {
    custId: number;
    docDescription: string;
    docIdentificationNumber: string;
    docType: string;
    docTypeCode: string;
    issueDate: string;
    expiryDate: string;
  }
  
  // Customer Address
  export interface CustomerAddress {
    customerID: number;
    addressType: number;
    addressLn1: string;
    addressLn2: string;
    city: string;
    village: string;
    district: string;
    taluka: string;
    state: string;
    pinCode: number;
    lastUpdate: string;
    dateOfCapture: string;
  }
  
  // Nominee Details
  export interface NomineeDetail {
    ownerId: number;
    nomineeRefNum: number;
    ownerType: number;
    seqNum: number;
    nomShare: number;
    nomType: number;
    nomTypeCode: number;
    nomineeFirstName: string;
    nomineeMiddleName: string;
    nomineeLastName: string;
    rtlnType: number;
    rtlnTypeCode: number;
    dateOfBirth: string;
    nomAddId: number;
    nomDocId: string;
    ver: number;
  }
  
  // Request Wrapper
  export interface RequestWrapper {
    customerDto: CustomerDto;
    docDto: DocDto;
    customerAddress: CustomerAddress;
    nomineeDetails: NomineeDetail[];
  }
  