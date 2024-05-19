import { getHashedPassword, verifyHashedPassword } from "../src/utils/helper";
import bcrypt from 'bcrypt';

describe('hashing password function', () => {
  
        test('should hash a valid password', async () => {
            const password = 'testPassword';
            const hashedPassword = await getHashedPassword(password);
            expect(await verifyHashedPassword(password, hashedPassword)).toBe(true);
        });

        test('should throw error when empty string passed', async () => { 
            await expect(getHashedPassword('')).rejects.toThrow();
        });

        test('should throw error for invalid input', async () => { 
            await expect(getHashedPassword(null)).rejects.toThrow();
            await expect(getHashedPassword()).rejects.toThrow();
            await expect(getHashedPassword(145)).rejects.toThrow();
        });

        test('should handle bcrypt hashing errors', async () => {
            jest.spyOn(bcrypt, 'hash').mockRejectedValue(new Error('bcrypt hashing error'));
            await expect(getHashedPassword('testPassword')).rejects.toThrow('bcrypt hashing error');
            bcrypt.hash.mockRestore();
        });

});
