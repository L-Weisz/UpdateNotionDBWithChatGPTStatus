import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const notionVersion = "2021-08-16";
const headers = {
    "Authorization": `Bearer ${process.env.NOTION_API_SECRET}`,
    "Notion-Version": notionVersion
}

export async function getNotionPageBlocks(pageId: string) {
    const url = `https://api.notion.com/v1/blocks/${pageId}/children`
    try {
        const response = await axios.get(url, { headers });
        return response.data;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError && axiosError.response) {
            console.error("Error fetching page content:", axiosError.response.data);
        } else {
            console.error("Error fetching page content:", error.message);
        }
    }
}
