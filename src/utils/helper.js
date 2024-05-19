import bcrypt from 'bcrypt';
import { customErrorHandler } from './errorHelper.js';

/**
 * Hashing password using bcrypt
 * @param {String} password 
 * @returns {String}
 */
async function getHashedPassword(password) {
    if (!password) {
        throw new Error('Password cannot be empty');
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch(error) {
        console.log(error?.message);
        throw error;
    }
}

/**
 * Verifies the password string with hashed string
 * @param {String} password 
 * @param {String} hashedPassword 
 * @returns {Boolean}
 */
async function verifyHashedPassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (error) {
        console.error('Error verifying hashed password:', error);
        throw error;
    }
}

/**
 * Custom Response Function
 * @param {Object} res 
 * @param {Number} status 
 * @param {Object} json 
 * @returns 
 */
async function customResponse ( res, status, json){
    return res.status(status).json(json);
} 

/**
 * Returning only necessary fields in api response
 * @param {Object} user 
 * @returns {Object}
 */
function userResponseData (user) {
   try{
     return {
     name : user?.name,
     email : user?.email,
     phoneNumber : user?.phoneNumber
    }
    }catch(error){
        console.log(error?.message);
        throw error;
    }
}

/**
 * Tests that URL is valid or not
 * @param {String} value 
 * @returns {Boolean}
 */
function validateUrl(value) {
    const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+)(:[0-9]{1,5})?(\/.*)?$/i;
    return urlPattern.test(value);
}

/**
 * Accepts date String and formats to MM D, YYYY
 * @param {String} dateString 
 * @returns 
 */
function formatDate(dateString){
    const date = new Date(dateString);
    const options = { month: 'long', day: '2-digit', year: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    const parts = formattedDate.split(' ');
    if (parts[1].length === 1) {
      parts[1] = '0' + parts[1];
    }
    return parts.join(' ');
  };

export {
   getHashedPassword,
   verifyHashedPassword,
   customResponse,
   userResponseData,
   validateUrl,
   formatDate
}