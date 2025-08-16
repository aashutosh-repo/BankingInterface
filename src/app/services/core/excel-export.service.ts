// excel-export.service.ts
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Injectable({ providedIn: 'root' })
export class ExcelExportService {
  exportCustomers(customers: any[], fileName: string): void {
    const exportData = customers.map((cust) => ({
      CustomerID: cust.customerDetails.customerId,
      FirstName: cust.customerDetails.firstName,
      LastName: cust.customerDetails.lastName,
      Mobile: cust.customerDetails.mobileNumber,
      Email: cust.customerDetails.mail,
      Status: cust.customerDetails.status,
      DateOfBirth: cust.customerDetails.dateOfBirth,
      OnboardingDate: cust.customerDetails.onboardingDate,
      Category: cust.customerDetails.customerCategory,
      RiskProfile: cust.customerDetails.riskProfile,
      RatingAgency: cust.customerDetails.ratingAgency,

      DocumentType: cust.documentDetails.docType,
      DocumentNumber: cust.documentDetails.docIdentificationNumber,
      DocumentExpiry: cust.documentDetails.expiryDate,

      Address: `${cust.addressDetails.addressLn1}, ${cust.addressDetails.city}, ${cust.addressDetails.state} - ${cust.addressDetails.pinCode}`,

      NomineeName:
        cust.nomineeDetails?.[0]?.nomineeFirstName +
        ' ' +
        cust.nomineeDetails?.[0]?.nomineeLastName,
      NomineeShare: cust.nomineeDetails?.[0]?.nomShare,
    }));

    // Convert JSON → worksheet
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(exportData);

    // Create workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Customers');

    // Save as file
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
}