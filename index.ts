import { extractTextFromBlocks } from "./utils/extractTextFromBlocks";
import { getNotionPageBlocks } from "./utils/getNotionPageContent";
import { getPagesFromNotionDataBase } from "./utils/getPagesFromNotionDataBase";
import { getStatusWithChatGPT } from "./utils/getStatusWithChatGPT";
import { updateNotionPageStatus } from "./utils/updateNotionPageStatus";



async function updateNotionDatabase() {
    const pages = await getPagesFromNotionDataBase()
    for (let page of pages) {
        const blocks = await getNotionPageBlocks(page.id)
        const content = extractTextFromBlocks(blocks)
        const status = await getStatusWithChatGPT(content);
        await updateNotionPageStatus(page.id, status)
    }
}

updateNotionDatabase();

