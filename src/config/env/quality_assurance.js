import { config } from 'dotenv'
config()
/* eslint-disable */
export default ({
    assistant: {
        version: process.env.assistantVersion,
        iam_apikey: process.env.assistantApikey,
        url: process.env.assistantURL,
        assistant_id: process.env.assistantID,

    }
})