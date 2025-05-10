// customer-data.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerDataService {
  private data: any = {
    customerDetails: null,
    addressDetails: null,
    documentDetails: null,
    nomineeDetails: null
  };

  setSection(section: string, value: any) {
    this.data[section] = value;
  }

  getSection(section: string): any {
    return this.data[section];
  }

  getAllData(): any {
    return this.data;
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
