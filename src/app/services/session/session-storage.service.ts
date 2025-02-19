import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  setItem(key: string, value: any): void {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }

  getItem<T>(key: string): T | null {
    if (typeof window !== 'undefined') {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  removeItem(key: string): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(key);
    }
  }

  clear(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.clear();
    }
  }
}
