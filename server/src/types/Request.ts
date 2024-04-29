declare namespace Express {
    export interface Request {
        user: {
            _id: string,
            userName: string,
            email: string
        }
    }
}