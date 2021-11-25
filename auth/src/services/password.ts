import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

// scrypt is callback implenmation. Promisify it to use it with async await
const scryptAsync = promisify(scrypt);

export class PasswordService {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString('hex');
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;

    return `${buffer.toString()}.${salt}`;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split('.');
    const buffer = (await scryptAsync(suppliedPassword, salt, 64)) as Buffer;
    return buffer.toString() === hashedPassword;
  }
}
