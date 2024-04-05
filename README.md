# AI Summarizer using AI/ML API

## Use
Get you AI/ML API Token today at https://aimlapi.com/

Suited for generating a summary of an audio file with the Deepgram API and AI/ML API

### Requests
`POST /summary` Returns a string with a summary based on the payload:
```ts
{
  // Audio file context (meeting, podcast, chat, article, newsletter, email, notice, academic paper, etc.)
  type: string
  // URL of audio file
  url: string
}
```
`GET /health` Health check. Returns an `ok` string if the app is running.


## Build
Build an image with the Docker:
```sh
docker build . -t ai-summarizer
```

## Run
Create a `.env` file in the root project folder with the following content:
```env
# Your Deepgram API token
DEEPGRAM_TOKEN=... 
# AI/ML API host
AIMLAPI_HOST=https://api.aimlapi.com
# You can pass any LLM-based text-generative model from AI/ML API
AIMLAPI_MODEL=meta-llama/Llama-2-70b-chat-hf 
# Your AI/ML API token
AIMLAPI_TOKEN=...
# Port that will be used
PORT=3000
```

Run it via Docker:
```sh
docker run --env-file ./.env -p 127.0.0.1:3000:3000 ai-summarizer
```

## Test
```sh
npm run test
```
