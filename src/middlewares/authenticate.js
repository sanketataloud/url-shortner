function authenticate (req,res,next){
    if(req.header.authorization){

    }
    else{
        const error = new Error();
        error.status = 401;
        error.message = "Unauthorized";
        throw error;
    }
}


export default authenticate;