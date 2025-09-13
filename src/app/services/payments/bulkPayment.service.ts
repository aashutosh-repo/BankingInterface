import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';


@Injectable({
    providedIn: 'root',
})
export class BulkPaymentService {
    constructor(private http: HttpClient) { }
    bulkFileUrl= 'http://localhost:8086/file/upload';
    bulkFileListUri= 'http://localhost:8086/file/uploads';

    uploadBulkPaymentFile(file: File): Observable<{progress?: number; body?: any}> {
        const formData: FormData = new FormData();
        formData.append('file', file);
        return this.http.post(this.bulkFileUrl, formData, {
            reportProgress: true,
            observe: 'events'
        }).pipe(
            map((event: HttpEvent<any>) => {
                if(event.type === HttpEventType.UploadProgress){
                    const progress = Math.round(100 * event.loaded / (event.total ?? event.loaded));
                    return { progress };
                }else if(event instanceof HttpResponse){
                    return { body: event.body };
                }else{
                    return {};
                }
            })
        );
    }
    events(uploadId: number): EventSource{ 
        return new EventSource(`/file/uploads/${uploadId}/events`);  
    }

    getUploadStatus(uploadId: number): Observable<any>{
        return this.http.get(`/file/uploads/${uploadId}/status`);
    }

    ListUploads(page=0,size=10): Observable<any>{
        // ?page=${page}&size=${size}
        return this.http.get(`http://localhost:8086/file/uploads?page=${page}&size=${size}`);
    }

    UploaadErrorReport(uploadId: number): Observable<Blob>{
        return this.http.get(`/file/uploads/${uploadId}/error-report`, { responseType: 'blob' });
    }

}