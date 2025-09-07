import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { BulkPaymentService } from '../../../services/payments/bulkPayment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileMetadata } from '../../../model/interfaces/payments/metadata.model';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-bulk-payments',
  imports: [SharedMaterialModules,MatSnackBarModule,MatProgressBarModule,MatPaginatorModule ],
  templateUrl: './bulk-payments.component.html',
  styleUrl: './bulk-payments.component.scss'
})
export class BulkPaymentsComponent implements OnInit {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploading: boolean = false;

  constructor(
    private paymentService: BulkPaymentService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  upload(): void {
    debugger;
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file first.', 'Close', { duration: 3000 });
      return;
    }


    this.uploading = true;
    this.paymentService.uploadBulkPaymentFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.progress !== undefined) {
          this.uploadProgress = event.progress;
        }
        if (event.body) {
          this.snackBar.open('Upload successful!', 'Close', { duration: 3000 });
          this.reset();
        }
      },
      error: (err) => {
        this.snackBar.open('Upload failed.', 'Close', { duration: 4000 });
        this.uploading = false;
      },
    });
    this.loadData();
  }

  loadData(): void {
    this.paymentService.ListUploads().subscribe({
      next: (data) => {
        this.dataSource = data;
        console.log('Uploads:', this.dataSource);
        this.totalRecords = data.totalElements;
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch uploads.', 'Close', { duration: 4000 });
      }
    });
  }

  dataSource: FileMetadata[] = [];
  displayedColumns: string[] = ['S.No.','fileName', 'uploadedBy', 'status', 'fileSizeBytes', 'uploadedAt'];
  totalRecords = 0;
  pageSize = 20;
  currentPage = 0;

  ngOnInit() {
    // this.loadData();
  }

  // loadData() {
  //   debugger;
  //   this.paymentService.ListUploads(this.currentPage, this.pageSize).subscribe((res: any) => {
  //     this.dataSource = res.content;
  //     this.totalRecords = res.totalElements;
  //   });
  // }

//   onPageChange(event: PageEvent) {
//   this.pageSize = event.pageSize;
//   this.currentPage = event.pageIndex;
//   this.loadData();
// }

  reset(): void {
    this.selectedFile = null;
    this.uploadProgress = null;
    this.uploading = false;
  }

}
