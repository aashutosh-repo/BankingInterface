import { createReducer, on } from '@ngrx/store';
import * as CustomerActions from './customer.actions';
import { initialCustomerOnboardingState } from './customer.model';

export const onboardingReducer = createReducer(
  initialCustomerOnboardingState,

  on(CustomerActions.saveBasicDetails, (state, { basicDetails }) => ({
    ...state,
    basicDetails
  })),

  on(CustomerActions.saveAddressDetails, (state, { addressDetails }) => ({
    ...state,
    addressDetails
  })),

  on(CustomerActions.saveDocuments, (state, { documents }) => ({
    ...state,
    documents
  })),

  on(CustomerActions.saveNomineeDetails, (state, { nomineeDetails }) => ({
    ...state,
    nomineeDetails
  })),

  on(CustomerActions.resetCustomer, () => initialCustomerOnboardingState),

  on(CustomerActions.submitCustomer, (state) => ({
    ...state,
    loading: true
  })),

  on(CustomerActions.submitCustomerSuccess, (state) => ({
    ...state,
    loading: false
  })),

  // on(CustomerActions.submitCustomerFailure, (state, { error }) => ({
  //   ...state,
  //   loading: false,
  //   error
  // }))
);
