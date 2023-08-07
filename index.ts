import { extractTextFromBlocks } from "./utils/extractTextFromBlocks";
import { getNotionPageBlocks } from "./utils/getNotionPageContent";
import { getPagesFromNotionDataBase } from "./utils/getPagesFromNotionDataBase";
import { getStatusWithChatGPT } from "./utils/getStatusWithChatGPT";
import { updateNotionPageStatus } from "./utils/updateNotionPageStatus";


const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

async function updateNotionDatabase() {
    const pages = await getPagesFromNotionDataBase()

    for (let page of pages) {
        const pageDate = new Date(page.properties.Date.date.start);
        if (pageDate < oneWeekAgo) continue;

        if (page.properties.Tries.number === 1) {
            await updateNotionPageStatus(page.id, "rtft");
            continue;
        }

        const blocks = await getNotionPageBlocks(page.id)
        const content = extractTextFromBlocks(blocks)
        const status = await getStatusWithChatGPT(content);
        await updateNotionPageStatus(page.id, status)
    }
}

updateNotionDatabase();

