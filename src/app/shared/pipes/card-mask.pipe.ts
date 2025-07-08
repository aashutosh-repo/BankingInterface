import { Pipe, PipeTransform } from "@angular/core";


@Pipe({
    name: 'cardMask',
    standalone: true,
})

export class CardMask implements PipeTransform {
    transform(value: string): string {
        if (!value) return '';
        const cleaned = value.replace(/\D/g, '');
        return cleaned.length === 16 ? `**** **** **** ${cleaned.slice(-4)}` : cleaned;
    }
}