import { extractTextFromBlocks } from "./utils/extractTextFromBlocks";
import { getNotionPageBlocks } from "./utils/getNotionPageContent";
import { getRecentPagesFromNotionDatabase } from "./utils/getRecentPagesFromNotionDatabase";
import { getStatusWithChatGPT } from "./utils/getStatusWithChatGPT";
import { isStatusValid } from "./utils/isStatusValid";
import { updateNotionPageStatus } from "./utils/updateNotionPageStatus";

async function updateNotionDatabase() {
    const pages = await getRecentPagesFromNotionDatabase()

    for (let page of pages) {
        const isRTFT = page.properties.Tries.number === 1
        if (isRTFT) {
            await updateNotionPageStatus(page.id, "rtft");
            continue;
        }

        const blocks = await getNotionPageBlocks(page.id)
        const content = extractTextFromBlocks(blocks)
        const status = await getStatusWithChatGPT(content);
        const verifiedStatus = isStatusValid(status) ? status : 'error'
        await updateNotionPageStatus(page.id, verifiedStatus)
    }
}

updateNotionDatabase();

