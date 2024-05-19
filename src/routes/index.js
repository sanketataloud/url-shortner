import express from 'express';
import validate from '../middlewares/validate.js';
import { linkRedirectorRules, urlShortnerRules } from '../validations/url.js';
import { linkredirector, urlShortner } from '../controllers/url.controller.js';
import { getHealth } from '../controllers/health.controller.js';

const router = express.Router();

/**
 * @openapi
 * /short:
 *   post:
 *     summary: Shorten a URL
 *     description: Takes a long URL and returns a shortened version of it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *                 description: The URL to be shortened
 *                 example: "https://example.com"
 *     responses:
 *       200:
 *         description: URL shortened successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URL Shortened Successfully"
 *                 data:
 *                   type: string
 *                   description: The shortened URL
 *                   example: "http://short.url/abc123"
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Bad Request"
 *                 error:
 *                   type: string
 *                   example: "URL is invalid"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.post('/short',validate(urlShortnerRules),urlShortner);

/**
 * @openapi
 * /{urlId}:
 *   get:
 *     summary: Redirect to the original URL
 *     description: Redirects to the original URL corresponding to the shortened URL ID.
 *     parameters:
 *       - in: path
 *         name: urlId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the shortened URL
 *     responses:
 *       302:
 *         description: Redirects to the original URL
 *       404:
 *         description: URL not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "URL Not Found"
 *                 error:
 *                   type: string
 *                   example: "Url Not Found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/:urlId',validate(linkRedirectorRules),linkredirector);

/**
 * @openapi
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Returns the health status of the server.
 *     responses:
 *       200:
 *         description: Health check information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Health Check"
 *                 data:
 *                   type: object
 *                   properties:
 *                     uptime:
 *                       type: number
 *                       description: The server uptime in seconds
 *                       example: 12345.67
 *                     environment:
 *                       type: object
 *                       properties:
 *                         nodeVersion:
 *                           type: string
 *                           description: The version of Node.js running on the server
 *                           example: "v14.16.0"
 *                         platform:
 *                           type: string
 *                           description: The operating system platform
 *                           example: "linux"
 *                     message:
 *                       type: string
 *                       example: "Ok"
 *                     date:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-05-19T12:34:56.789Z"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Internal Server Error"
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
router.get('/health',getHealth);
export default router;