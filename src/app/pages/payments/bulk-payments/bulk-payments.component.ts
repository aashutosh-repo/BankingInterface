import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { SharedMaterialModules } from '../../../shared/material-imports/shared-material.module';
import { BulkPaymentService } from '../../../services/payments/bulkPayment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FileMetadata } from '../../../model/interfaces/payments/metadata.model';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-bulk-payments',
  imports: [SharedMaterialModules,MatSnackBarModule,MatProgressBarModule,MatPaginatorModule ],
  templateUrl: './bulk-payments.component.html',
  styleUrl: './bulk-payments.component.scss'
})
export class BulkPaymentsComponent implements AfterViewInit  {
  selectedFile: File | null = null;
  uploadProgress: number | null = null;
  uploading: boolean = false;
  @ViewChild(MatPaginator) paginator!: MatPaginator;


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
    if (!this.selectedFile) {
      this.snackBar.open('Please select a file first.', 'Close', { duration: 3000 });
      return;
    }


    this.uploading = true;
    this.paymentService.uploadBulkPaymentFile(this.selectedFile).subscribe({
      next: (event) => {
        setTimeout(() => {
        if (event.progress !== undefined) {
          this.uploadProgress = event.progress;
        }
        if (event.body) {
          this.snackBar.open('Upload successful!', 'Close', { duration: 3000 });
          this.reset();
        }
        });
      },
      error: (err) => {
        this.snackBar.open('Upload failed.', 'Close', { duration: 4000 });
        this.uploading = false;
      },
    });
  }

  loadData(page: number, size: number): void {
    this.paymentService.ListUploads(page,size).subscribe({
      next: (data) => {
        this.dataSource.data = data.content;
        this.totalRecords = data.totalElements;
        this.currentPage = page;
        this.dataReady = true; 
        // this.cdr.detectChanges(); // force sync change detection
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch uploads.', 'Close', { duration: 4000 });
      }
    });
  }

  dataReady: boolean = false;
  dataSource= new MatTableDataSource<FileMetadata>();
  displayedColumns: string[] = ['S.No.','fileName', 'uploadedBy', 'status', 'fileSizeBytes', 'uploadedAt'];
  totalRecords = 0;
  pageSize: number = 10;
  currentPage: number = 0;

  ngAfterViewInit() {
  setTimeout(() => {
    this.dataSource.paginator = this.paginator;
    this.loadData(this.currentPage, this.pageSize);
    this.currentPage = 1;
  });
  }

  onPageChange(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData(this.currentPage, this.pageSize);
  }


  reset(): void {
    this.selectedFile = null;
    this.uploadProgress = null;
    this.uploading = false;
  }

}
