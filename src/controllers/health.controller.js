import httpStatus from "http-status";
import { customResponse, formatDate} from "../utils/helper.js"


const getHealth = async (req, res) => {
    try{
        const environment = {
            nodeVersion: process.version,
            platform: process.platform,
          };
      
          const data = {
            uptime: process.uptime(),
            environment,
            message: 'Ok',
            date: formatDate(new Date()),
          };
      
        customResponse(res, httpStatus.OK, { message: 'Health Check', data });

    }catch(error){
        customResponse(res,error?.status,{
            message : "Internal Server Error",
            error : error?.message
        })
    }
}

export {
    getHealth
}