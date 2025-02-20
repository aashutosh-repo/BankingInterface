import { CustomerAddress } from "./customerAddress.model"
import { CustomerDto } from "./customerDTO.model"
import { DocumentDTO } from "./DocumentDTO.model"
import { NomineeDetails } from "./nomineeDetails.model"

export interface Root {
    customerDto: CustomerDto
    docDto: DocumentDTO
    customerAddress: CustomerAddress
    nomineeDetails: NomineeDetails[]
  }