interface NotionTextContent {
    plain_text: string;
}

interface NotionParagraphBlock {
    type: 'paragraph';
    paragraph: {
        text: NotionTextContent[];
    };
}

interface NotionHeading1Block {
    type: 'heading_1';
    heading_1: {
        text: NotionTextContent[];
    };
}

interface NotionHeading2Block {
    type: 'heading_2';
    heading_2: {
        text: NotionTextContent[];
    };
}

interface NotionHeading3Block {
    type: 'heading_3';
    heading_3: {
        text: NotionTextContent[];
    };
}

interface NotionBulletedListItemBlock {
    type: 'bulleted_list_item';
    bulleted_list_item: {
        text: NotionTextContent[];
    };
}

interface NotionNumberedListItemBlock {
    type: 'numbered_list_item';
    numbered_list_item: {
        text: NotionTextContent[];
    };
}

interface NotionTodoBlock {
    type: 'to_do';
    to_do: {
        text: NotionTextContent[];
        checked: boolean;
    };
}

interface NotionToggleBlock {
    type: 'toggle';
    toggle: {
        text: NotionTextContent[];
    };
}

interface NotionCodeBlock {
    type: 'code';
    code: {
        text: NotionTextContent[];
        language: string;  // Assuming there's a language property; adjust as needed.
    };
}


// ... other block types ...

type NotionBlock = NotionParagraphBlock | NotionHeading1Block | NotionHeading2Block | NotionHeading3Block | NotionBulletedListItemBlock | NotionNumberedListItemBlock | NotionTodoBlock | NotionToggleBlock | NotionCodeBlock;

interface NotionResponse {
    results: NotionBlock[];
}

export function extractTextFromBlocks(response: NotionResponse): string {
    let content = "";

    for (let block of response.results) {
        let textContent: string | null = null;

        switch (block.type) {
            case 'paragraph':
                textContent = block.paragraph?.text[0]?.plain_text;
                if (textContent) content += textContent + "\n";
                break;
            case 'heading_1':
                textContent = block.heading_1?.text[0]?.plain_text;
                if (textContent) content += '# ' + textContent + "\n";
                break;
            case 'heading_2':
                textContent = block.heading_2?.text[0]?.plain_text;
                if (textContent) content += '## ' + textContent + "\n";
                break;
            case 'heading_3':
                textContent = block.heading_3?.text[0]?.plain_text;
                if (textContent) content += '### ' + textContent + "\n";
                break;
            case 'bulleted_list_item':
                textContent = block.bulleted_list_item?.text[0]?.plain_text;
                if (textContent) content += '- ' + textContent + "\n";
                break;
            case 'numbered_list_item':
                textContent = block.numbered_list_item?.text[0]?.plain_text;
                if (textContent) content += '1. ' + textContent + "\n";  // Consider handling the numbering properly if needed.
                break;
            case 'to_do':
                textContent = block.to_do?.text[0]?.plain_text;
                if (textContent) content += (block.to_do.checked ? '[x]' : '[ ]') + ' ' + textContent + "\n";
                break;
            case 'toggle':
                textContent = block.toggle?.text[0]?.plain_text;
                if (textContent) content += '> ' + textContent + "\n";
                break;
            case 'code':
                const codeContent = block.code?.text[0]?.plain_text;
                if (codeContent) content += "```" + (block.code.language || '') + "\n" + codeContent + "\n```\n";  // Surround with code fences and specify language if present.
                break;
            default:
                break;
        }
    }

    return content;
}



