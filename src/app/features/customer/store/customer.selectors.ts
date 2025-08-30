import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CustomerOnboardingState } from './customer.model';

export const selectCustomerOnboardingState = createFeatureSelector<CustomerOnboardingState>('customerOnboarding');

export const selectBasicDetails = createSelector(selectCustomerOnboardingState, (state) => state.basicDetails);
export const selectAddressDetails = createSelector(selectCustomerOnboardingState, (state) => state.addressDetails);
export const selectDocuments = createSelector(selectCustomerOnboardingState, (state) => state.documents);
export const selectNomineeDetails = createSelector(selectCustomerOnboardingState, (state) => state.nomineeDetails);
