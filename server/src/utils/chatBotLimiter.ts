import { rateLimit } from 'express-rate-limit'

const chatLimiter = rateLimit({
    windowMs:   5 * 60 * 1000,
    max: 10,
    standardHeaders: true, legacyHeaders: true
})

export default chatLimiter;