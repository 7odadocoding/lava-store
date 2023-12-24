import * as crypto from 'crypto';

export function generateSso(): string {
   const randomBytes = new Uint8Array(3);
   crypto.getRandomValues(randomBytes);
   return Buffer.from(randomBytes).toString('hex');
}
