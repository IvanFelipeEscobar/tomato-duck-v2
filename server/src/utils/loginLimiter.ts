import { rateLimit } from 'express-rate-limit'

const loginLimiter = rateLimit({
    windowMs:  60 * 1000,
    max: 5,
    message: "Too many login attempts from this device, try again in 60 seconds",
    standardHeaders: true, legacyHeaders: true
})

export default loginLimiter;