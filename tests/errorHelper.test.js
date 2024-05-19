import { customErrorHandler } from "../src/utils/errorHelper"

describe('first', () => { 

    let consoleSpy;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    })

    afterEach(() => {
        consoleSpy.mockRestore();
    })


    test('Test if the function throws an error with the correct message', () => { 
        const message = "Error Message";
        try {
            customErrorHandler(message);
        } catch (error) {
            expect(error.message).toBe(message);
        }
     })

     test('Test if the function throws an error with the correct status.', () => { 
        const status = 404;
        try{
            customErrorHandler('',status);
        }catch(error){
            expect(error.status).toBe(status);
        }
      })

      test('Test if the function throws an error with the correct stack trace', () => { 
        const stack = 'This is a stack trace';
        try{
            customErrorHandler('',500 ,stack);
        }catch(error){
            expect(error.stack).toBe(stack);
        }
       })

       test('Test if the function throws an error with default values when no arguments are provided', () => { 
        try{
            customErrorHandler();
        }catch(error){
            expect(error.message).toBe('Internal Server Error');
            expect(error.status).toBe(500);
            expect(error.stack).toBe('');
        }
        })

        test('Test if the error message is logged correctly.', () => { 
            const message = 'console spy on';
            try{
                customErrorHandler(message);
            }catch (error) {
            
            }
            expect(consoleSpy).toHaveBeenCalledWith(`ERROR ::: ${message}`);
         })
 })