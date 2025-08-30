import { CustomerAddress, CustomerDto, DocDto, NomineeDetail } from "../../../model/interfaces/request-wrapper.model";

export interface CustomerOnboardingState {
  basicDetails: CustomerDto | null;
  addressDetails: CustomerAddress | null;
  documents: DocDto[];
  nomineeDetails: NomineeDetail[];
  loading: boolean;
  error: any;
}

export const initialCustomerOnboardingState: CustomerOnboardingState = {
  basicDetails: null,
  addressDetails: null,
  documents: [],
  nomineeDetails: [],
  loading: false,
  error: null
};