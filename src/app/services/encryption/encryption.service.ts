import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey: string = 'mySuperSecretKey1234567890123456'; // Must match backend

  async generateKey(): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.secretKey),
      { name: 'AES-GCM' },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: string): Promise<string> {
    const key = await this.generateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      new TextEncoder().encode(data)
    );

    // Combine IV and encrypted data for transmission
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    return btoa(String.fromCharCode(...encryptedArray)); // Convert to Base64
  }

  async decrypt(encryptedData: string): Promise<string> {
    const key = await this.generateKey();
    const encryptedArray = new Uint8Array(
      atob(encryptedData)
        .split('')
        .map(char => char.charCodeAt(0))
    );

    const iv = encryptedArray.slice(0, 12); // Extract IV
    const encryptedBytes = encryptedArray.slice(12); // Extract ciphertext

    const decryptedData = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      encryptedBytes
    );

    return new TextDecoder().decode(decryptedData);
  }
}
