import AssistantV2 from 'ibm-watson/assistant/v2'
import { IamAuthenticator } from 'ibm-watson/auth'
import { env } from '../../config'

export default new AssistantV2({
    version: env.assistant.version,
    authenticator: new IamAuthenticator({
        apikey: env.assistant.apikey
    }),
    url: env.assistant.url
})