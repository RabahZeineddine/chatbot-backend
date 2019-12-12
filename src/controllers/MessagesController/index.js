import AssistantController from '../AssistantController'


class MessagesController {

    constructor() {
    }

    async parseAssistantOutput(result) {
        let messages = result.output.generic.reduce((acc, curr) => {
            switch (curr.response_type) {
            case 'text':
                acc.push({
                    type: curr.response_type,
                    value: curr.text,
                    user: 'application',
                    date: new Date().getTime()
                })
                break
            case 'option':
                acc.push({
                    type: curr.description || curr.response_type,
                    title: curr.title,
                    options: curr.options.map((option) => ({
                        label: option.label,
                        value: option.value.input.text
                    })),
                    user: 'application',
                    date: new Date().getTime()
                })
            }
            return acc
        }, [])
        return messages
    }

    async send(params) {
        let assistantController = new AssistantController()
        try {
            let result = await assistantController.sendMessage({message: params})
            let messages = await this.parseAssistantOutput(result)
            return {
                messages,
                context: result.context,
                sessionId: result.sessionId
            }
        } catch (err) {
            throw new Error(err)
        }
    }

}


export default MessagesController