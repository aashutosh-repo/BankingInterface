import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';


@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  private secretKey: string = 'mySuperSecretKey1234567890123456'; // Must match backend
  private readonly IV_LENGTH = 12;

  private static uint8ToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach(b => binary += String.fromCharCode(b));
    return btoa(binary);
  }
  
  private static base64ToUint8(base64: string): Uint8Array {
    const binary = atob(base64);
    return new Uint8Array([...binary].map(char => char.charCodeAt(0)));
  }


  async generateKey(): Promise<CryptoKey> {
    return crypto.subtle.importKey(
      'raw',
      new TextEncoder().encode(this.secretKey),
      { name: 'AES-GCM', },
      false,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: string): Promise<string> {
    const key = await this.generateKey();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 12-byte IV for AES-GCM
    console.log(key);

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      key,
      new TextEncoder().encode(data)
    );

    // Combine IV and encrypted data for transmission
    const encryptedArray = new Uint8Array(iv.length + encryptedData.byteLength);
    encryptedArray.set(iv, 0);
    encryptedArray.set(new Uint8Array(encryptedData), iv.length);

    return EncryptionService.uint8ToBase64(encryptedArray);
  }

  async decrypt(encryptedData: string): Promise<string> {
    const key = await this.generateKey();
    const encryptedArray = EncryptionService.base64ToUint8(encryptedData);
    const iv = encryptedArray.slice(0, this.IV_LENGTH);
    const cipherBytes = encryptedArray.slice(this.IV_LENGTH);

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      key,
      cipherBytes
    );

    return new TextDecoder().decode(decrypted);
  }
}
