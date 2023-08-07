import { extractTextFromBlocks } from "./utils/extractTextFromBlocks";
import { getNotionPageBlocks } from "./utils/getNotionPageContent";
import { getPagesFromNotionDataBase } from "./utils/getPagesFromNotionDataBase";
import { getStatusWithChatGPT } from "./utils/getStatusWithChatGPT";
import { isStatusValid } from "./utils/isStatusValid";
import { updateNotionPageStatus } from "./utils/updateNotionPageStatus";


const oneWeekAgo = new Date();
oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

async function updateNotionDatabase() {
    const pages = await getPagesFromNotionDataBase()

    for (let page of pages) {
        const isOlderThanAWeek = new Date(page.properties.Date.date.start) < oneWeekAgo
        if (isOlderThanAWeek) continue;

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

