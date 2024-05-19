import { customErrorHandler } from "../utils/errorHelper.js";
import { nanoid } from "nanoid";
import { validateUrl } from "../utils/helper.js";
import config from "../config/config.js";
import UrlModel from "../models/url.model.js";

async function urlShortnerService (originalUrl) {
try{
    const urlId = nanoid();
    const base = config.BASE;

    const isExisting = await UrlModel.findOne({originalUrl});

    if(isExisting){
        return isExisting.shortenedUrl;
    }

    if(validateUrl(originalUrl)){

        const shortUrl = `${base}/${urlId}`;

        const shortnedUrl = new UrlModel({
            urlId,
            originalUrl,
            shortenedUrl: shortUrl
        });
    
        await shortnedUrl.save();
    
        return shortUrl;
    }

    customErrorHandler('URL not valid',405);

}catch(error){
    customErrorHandler(...error);
}
}

async function linkredirectorService(urlId) {
    try {
        const url = await UrlModel.findOne({ urlId });
        if (url) {
            await UrlModel.updateOne(
                { urlId }, 
                { $inc: { clicks: 1 } }
            );
            return url.originalUrl;
        } else {
            customErrorHandler('Url Not Found', 404);
        }
    } catch (error) {
        customErrorHandler(error.message, 500);
    }
}


export {
    urlShortnerService,
    linkredirectorService
}