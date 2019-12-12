import { config } from 'dotenv'
config()
/* eslint-disable */
export default ({
    assistant: {
        version: process.env.assistantVersion,
        apikey: process.env.assistantApikey,
        url: process.env.assistantURL,
        assistantId: process.env.assistantID,

    }
})