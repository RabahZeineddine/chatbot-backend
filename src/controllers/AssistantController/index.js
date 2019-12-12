import Assistant from '../../config/Assistant'
import env from '../../config/env'


class AssistantController {

    constructor() {
        this.assistant = Assistant
    }

    async createSession() {
        try {
            let { result: { session_id } } = await this.assistant.createSession({
                assistantId: env.assistant.assistantId
            })
            return session_id
        } catch (err) {
            console.error(err)
            throw new Error(err)
        }
    }

    async AssistantOptions(params) {
        if (!params.sessionId || params.sessionId == '') {
            try {
                let sessionId = await this.createSession()
                params.sessionId = sessionId
            } catch (err) {
                throw new Error(err)
            }
        }
        return {
            assistantId: env.assistant.assistantId,
            sessionId: params.sessionId,
            input: {
                'message_type': params.message.type,
                'text': params.message.value || ' ',
                'options': {
                    'return_context': true
                }
            },
            context: params.context || {}
        }

    }



    async sendMessage(params) {

        try {
            let messageOptions = await this.AssistantOptions(params)
            try {
                let { result } = await this.assistant.message(messageOptions)
                result.sessionId = params.sessionId
                return result
            } catch (err) {
                let error = JSON.parse(err.body)
                if (error && error.code === 404) {
                    try {
                        delete params.sessionId
                        return await this.sendMessage(params)

                    } catch (err) {
                        console.error(err)
                        throw new Error(err)
                    }
                } else
                    throw new Error(err)
            }
        } catch (err) {
            throw new Error(err)
        }

    }
}


export default AssistantController