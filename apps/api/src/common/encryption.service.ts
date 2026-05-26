import { Injectable, Logger } from '@nestjs/common';
import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

@Injectable()
export class EncryptionService {
  private readonly logger = new Logger(EncryptionService.name);
  private readonly algorithm = 'aes-256-gcm';
  private readonly key: Buffer;

  constructor() {
    const envKey = process.env.ENCRYPTION_KEY;

    if (envKey) {
      this.key = Buffer.from(envKey, 'hex');
    } else {
      this.key = randomBytes(32);
      this.logger.warn(
        'ENCRYPTION_KEY not set — generated a random key. Data encrypted with this key will be unrecoverable after restart. ' +
          'Set ENCRYPTION_KEY (64-char hex) in your environment.',
      );
    }
  }

  /**
   * Encrypts plaintext using AES-256-GCM.
   * Returns a string in the format `iv:authTag:ciphertext` (hex-encoded).
   */
  encrypt(plaintext: string): string {
    const iv = randomBytes(12);
    const cipher = createCipheriv(this.algorithm, this.key, iv);

    let encrypted = cipher.update(plaintext, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
  }

  /**
   * Decrypts an `iv:authTag:ciphertext` hex-encoded string back to plaintext.
   */
  decrypt(encrypted: string): string {
    const [ivHex, authTagHex, ciphertext] = encrypted.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = createDecipheriv(this.algorithm, this.key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(ciphertext, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
  }

  /**
   * Checks whether a value looks like an encrypted string (3 hex parts separated by colons).
   */
  isEncrypted(value: string): boolean {
    if (!value || typeof value !== 'string') return false;
    const parts = value.split(':');
    if (parts.length !== 3) return false;
    return parts.every((part) => /^[0-9a-f]+$/i.test(part));
  }
}
