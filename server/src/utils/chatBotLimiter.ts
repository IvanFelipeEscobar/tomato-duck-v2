import { rateLimit } from 'express-rate-limit'

const chatLimiter = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,
    max: 20,
    message: "to control cost there's a limit of 20 requests for a 24 hr period. chat gpt is much better configured and free",
    standardHeaders: true, legacyHeaders: true
})

export default chatLimiter;