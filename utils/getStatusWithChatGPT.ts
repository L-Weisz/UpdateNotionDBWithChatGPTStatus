import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';
import { COMPUTE_PAGE_STATUS_PROMPT } from '../chatGPTPrompt';

dotenv.config();

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_SECRET,
});
const openai = new OpenAIApi(configuration);

export async function getStatusWithChatGPT(pageContent: string): Promise<any> {
    const promptText = COMPUTE_PAGE_STATUS_PROMPT + pageContent;

    try {
        const chatCompletion = await openai.createChatCompletion({
            model: "gpt-4",
            messages: [{ role: "user", content: promptText }],
        });
        return chatCompletion.data.choices[0].message?.content;
    } catch (err) {
        console.log('Error ChatGPT: ' + err);
        return 'error';
    }
}



