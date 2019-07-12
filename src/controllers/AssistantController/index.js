import Assistant from '../../config/Assistant'
import env from '../../config/env'


class AssistantController {

    constructor() {
        this.assistant = Assistant
    }

    async createSession() {
        console.log('Create session method invoked..')
        try {
            let { session_id } = await this.assistant.createSession({
                assistant_id: env.assistant.assistant_id
            })
            console.log('Session id: ' + session_id)
            return session_id
        } catch (err) {
            console.log(err)
            throw new Error(err)
        }
    }

    async AssistantOptions(params) {
        if (!params.session_id || params.session_id == '') {
            try {
                let session_id = await this.createSession()
                params.session_id = session_id
            } catch (err) {
                throw new Error(err)
            }
        }
        return {
            assistant_id: env.assistant.assistant_id,
            session_id: params.session_id,
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
                let response = await this.assistant.message(messageOptions)
                response.session_id = params.session_id
                return response
            } catch (err) {
                let error = JSON.parse(err.body)
                if (error && error.code === 404) {
                    try {
                        delete params.session_id
                        return await this.sendMessage(params)

                    } catch (err) {
                        console.log(err)
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