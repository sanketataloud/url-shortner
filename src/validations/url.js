import { body,param } from 'express-validator';

const urlShortnerRules = [
    body('url').exists().isString().isURL()
]

const linkRedirectorRules = [
    param('urlId').exists().withMessage('Url id is required')
]

export {
    urlShortnerRules,
    linkRedirectorRules
}