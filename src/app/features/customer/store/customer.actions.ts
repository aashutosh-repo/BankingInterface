import { createAction, createActionGroup, emptyProps, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { CustomerAddress, CustomerDto, DocDto, NomineeDetail } from '../../../model/interfaces/request-wrapper.model';


export const CustomerActions = createActionGroup({
  source: 'Customer/API',
  events: {
    'Load Customers': props<{ customers: CustomerDto[] }>(),
    'Add Customer': props<{ customer: CustomerDto }>(),
    'Upsert Customer': props<{ customer: CustomerDto }>(),
    'Add Customers': props<{ customers: CustomerDto[] }>(),
    'Upsert Customers': props<{ customers: CustomerDto[] }>(),
    'Update Customer': props<{ customer: Update<CustomerDto> }>(),
    'Update Customers': props<{ customers: Update<CustomerDto>[] }>(),
    'Delete Customer': props<{ id: string }>(),
    'Delete Customers': props<{ ids: string[] }>(),
    'Clear Customers': emptyProps(),
  }
});

export const saveBasicDetails = createAction('[Customer Onboarding] Save Basic Details', props<{ basicDetails: CustomerDto }>());
export const resetCustomer = createAction('[Customer] Reset Customer');

export const saveAddressDetails = createAction('[Customer Onboarding] Save Address Details', props<{ addressDetails: CustomerAddress }>());
export const saveDocuments = createAction('[Customer Onboarding] Save Documents', props<{ documents: DocDto[] }>());
export const saveNomineeDetails = createAction('[Customer Onboarding] Save Nominee Details', props<{ nomineeDetails: NomineeDetail[] }>());
export const submitCustomer = createAction('[Customer Onboarding] Submit Customer');
export const submitCustomerSuccess = createAction('[Customer Onboarding] Submit Customer Success');
export const submitCustomerFailure = createAction('[Customer Onboarding] Submit Customer Failure');

