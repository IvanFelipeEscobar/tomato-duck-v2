import OpenAI from "openai";
import 'dotenv/config'
import { Request, Response } from "express";

 const openai =  new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: 'org-VlxOAvV1LSrujX2lZi18w3Cq'
 })

 const chatSubmit = async ({body}: Request, res: Response) => {
const {prompt} = body
try {
    const genResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [{role: 'system', content: prompt}]
    })
    const botAnswer = genResponse.choices[0].message
    return res.status(201).json(botAnswer)
} catch (error) {
    console.error(error)
}
 }

 export default chatSubmit
