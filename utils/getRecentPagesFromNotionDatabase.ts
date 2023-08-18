import axios, { AxiosError } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const notionVersion = "2021-08-16";
const headers = {
    "Authorization": `Bearer ${process.env.NOTION_API_SECRET}`,
    "Notion-Version": notionVersion
}

// Calculate the date of one week ago and format it for the Notion API
const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
const formattedOneWeekAgo = `${oneWeekAgo.getFullYear()}-${String(oneWeekAgo.getMonth() + 1).padStart(2, '0')}-${String(oneWeekAgo.getDate()).padStart(2, '0')}`;

export async function getRecentPagesFromNotionDatabase() {
    const databaseId = process.env.DATABASE_ID;

    const filterOutOlderThanAWeek = {
        filter: {
            property: "🟢 Date",
            date: {
                "after": formattedOneWeekAgo
            }
        }
    };

    try {
        const url = `https://api.notion.com/v1/databases/${databaseId}/query`;
        const response = await axios.post(url, filterOutOlderThanAWeek, { headers });
        return response.data.results;
    } catch (error: any) {
        const axiosError = error as AxiosError;
        if (axiosError && axiosError.response) {
            console.error("Erreur lors de la requête de la base de données:", axiosError.response.data);
        } else {
            console.error("Erreur lors de la requête de la base de données:", error.message);
        }
        return [];
    }
}

