// label-mapper.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LabelMapperService {
  getLabel(options: { value: string | number; label: string }[], value: string | number): string {
    const valueStr = String(value);
    const matched = options.find(opt => opt.value === valueStr);
    return matched ? matched.label : valueStr;
  }
}
