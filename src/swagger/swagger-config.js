import swaggerJSDoc from "swagger-jsdoc";
import path from 'path';
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options = {
definition : {
    openapi : '3.0.0',
    info : {
        title : 'URL Shortner System',
        version : '1.0.0',
        description : 'Longs URLs can be shortened using this APIs'
    },
    servers :[
        {
            url: 'http://localhost:4005',
            description: 'Local Server',
     },
    ]
},
apis :  [path.join(__dirname, '../routes/**/*.js')],
}

const swaggerSpec = swaggerJSDoc(options);

export {
    swaggerSpec
};