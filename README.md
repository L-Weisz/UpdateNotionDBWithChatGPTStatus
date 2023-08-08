# Statut DBQuality ChatGPT Project

This project integrates with the Notion API to retrieve and process text blocks from a Notion database using Notion API.

It provides functionality to extract textual content from various Notion block types. 

Using the page content is then computes a status using Open AI API. 

It then updates the status in the Notion DB using Notion API. 

# Demo

https://github.com/L-Weisz/UpdateNotionDBWithChatGPTStatus/assets/117728108/823112ce-4254-4fa4-896a-4dd04a4e4d4f

## Features

- **Notion Integration**: Direct interaction with the Notion API to fetch block details.
- **Text Extraction**: Extracts and processes text from various Notion block types:
  - Paragraphs
  - Headings (Levels 1-3)
  - Bulleted List Items
  - Numbered List Items
  - To-Do Items
  - Toggle Blocks
  - Code Blocks
- **ChatGPT Status Computation**: After extracting the text, the application processes the content through a ChatGPT prompt to compute a status.

## Installation

1. Clone the repository:
```bash

$ git clone <repository-url>
```

2. Install the required dependencies:
```bash

$ npm install
```

3. Add secrets to env variables:
- Rename `.env.example` in `.env`
- Add secrets shared in Dashlane
  

## Start the project 
```bash

$ npm start
```
