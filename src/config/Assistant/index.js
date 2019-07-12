import AssistantV2 from 'ibm-watson/assistant/v2'
import { env } from '../../config'

export default new AssistantV2({
    version: env.assistant.version,
    iam_apikey: env.assistant.iam_apikey,
    url: env.assistant.url
})