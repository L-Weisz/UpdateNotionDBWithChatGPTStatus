import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const notionVersion = "2021-08-16";
const headers = {
    "Authorization": `Bearer ${process.env.NOTION_API_SECRET}`,
    "Notion-Version": notionVersion
}

export async function getPagesFromNotionDataBase() {
    const databaseId = process.env.DATABASE_ID;

    try {
        const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
        const response = await axios.post(url, {}, { headers });
        return response.data.results;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError && axiosError.response) {
            console.error("Erreur lors de la requête de la base de données:", axiosError.response.data);
        } else {
            console.error("Erreur lors de la requête de la base de données:", error.message);
        }
        return []
    }
}
