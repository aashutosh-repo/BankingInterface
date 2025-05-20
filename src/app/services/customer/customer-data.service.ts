// customer-data.service.ts
import { Injectable } from '@angular/core';
import { CustomerData } from '../../model/interfaces/customer.model';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private data: CustomerData = {
    customerDetails: null,
    addressDetails: null,
    documentDetails: null,
    nomineeDetails: null
  };

  listofCustomerData: CustomerData[] = []

  setSection<K extends keyof CustomerData>(section: K, value: CustomerData[K]) {
    this.data[section] = value;
  }
  addCustomerData(value : CustomerData) {
    console.log('Adding customer data:', value);
    this.listofCustomerData.push(value);
  }

  getSection<K extends keyof CustomerData>(section: K): CustomerData[K] {
    return this.data[section];
  }

  getAllData(): CustomerData {
    return this.data;
  }

  getAllCustomerData(): CustomerData[] {
    return this.listofCustomerData;
  }

  resetAll() {
    this.data = {
      customerDetails: null,
      addressDetails: null,
      documentDetails: null,
      nomineeDetails: null
    };
  }
}
