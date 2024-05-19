import httpStatus from "http-status";
import { linkredirectorService, urlShortnerService } from "../services/url.service.js";
import { customResponse } from "../utils/helper.js"

async function urlShortner(req, res){
    try{        
        const url = req.body.url;

        const shortenedUrl = await urlShortnerService(url);

        customResponse(res,httpStatus.OK,{
            message : "URL Shortned Sucessfully",
            data : shortenedUrl
        })
    }catch(error){
        customResponse(res,error?.status,{
            message : "Internal Server Error",
            error : error?.message
        })
    }
}

async function linkredirector (req, res ){
try{
    const urlId = req.params.urlId;
    const originalUrl = await linkredirectorService(urlId);
    return res.redirect(originalUrl);
}catch(error){
    customResponse(res,error?.status,{
        message : "Internal Server Error",
        error : error?.message
    })
}
}

export {
    urlShortner,
    linkredirector
}