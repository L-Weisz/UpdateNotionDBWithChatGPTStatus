import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const notionVersion = "2021-08-16";
const headers = {
    "Authorization": `Bearer ${process.env.NOTION_API_SECRET}`,
    "Notion-Version": notionVersion
}

export async function updateNotionPageStatus(pageId: string, status: string) {
    const url = `https://api.notion.com/v1/pages/${pageId}`;
    const updatePayload = {
        properties: {
            ChatGPTStatus: {
                multi_select: [{ name: status }]
            }
        }
    };
    try {
        await axios.patch(url, updatePayload, { headers });
        console.log(`Page ${pageId} mise à jour avec succès avec le statut ${status}.`);
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError && axiosError.response) {
            console.error("Erreur lors de la mise à jour de la page:", axiosError.response.data);
        } else {
            console.error("Erreur lors de la mise à jour de la page:", error.message);
        }
    }
}
