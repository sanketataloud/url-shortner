function customErrorHandler(message='Internal Server Error',status=500,stack=''){
    console.log(`ERROR ::: ${message}`);
    const error = new Error();
    error.message = message;
    error.stack = stack;
    error.status = status;
    throw error;    
}

export {
    customErrorHandler
}