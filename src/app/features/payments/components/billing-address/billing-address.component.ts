import { Component, Inject, Input, input, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';

@Component({
  selector: 'app-billing-address',
  imports: [SharedMaterialModules, ReactiveFormsModule ],
  templateUrl: './billing-address.component.html',
  styleUrl: './billing-address.component.scss'
})
export class BillingAddressComponent{
@Input({ required: true }) billingForm!: FormGroup;
  // @Input() billingForm!: FormGroup;
  // constructor(private fb : FormBuilder){
  // }
  // ngOnInit(): void {
  //   if(!this.billingForm.get('billingAddress')){
  //     this.billingForm.addControl('billingAddress', this.fb.group({
  //       payerName: ['', Validators.required],
  //       city: ['', Validators.required],
  //       fullAddress: ['', Validators.required],
  //       country: ['', Validators.required],
  //       pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
  //     }));
  //   }

  // }

  // get getBillingForm(){
  //   return this.billingForm.get('billingAddress') as FormGroup;
  // }
}
