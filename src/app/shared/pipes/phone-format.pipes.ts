import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'phoneFormat',
    standalone: true,
})

export class PhoneFormatPipe implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        const cleaned = value.replace(/\D/g, '');
        return cleaned.length === 10 ? `+91-${cleaned.slice(0, 5)}-${cleaned.slice(5)}` : cleaned; 
    }
}