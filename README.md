# KariaAI 

Karia AI is a Career Advisor App for students to discover career paths that fits their interest and background.

## Development Setup

- React Frontend Dependencies are managed through yarn (not NPM) as we rely on yarn workspace for managing the entire monorepo
- Python Backend Dependencies is managed through pipenv
- Entire Monorepo is managed through yarn workspace

### Step by Step Instruction

1. clone this repo by running `git clone [https://github.com/tosinamuda/datafest-llm-workshop.git](https://github.com/useentropy/kariaai/)`
2. Change your directory to kariaai by running: `cd kariaai`
3. Run `yarn` to install all the dependencies
4. Copy the `.env.sample` to `.env` and replace the `OPENAI_API_KEY` or `CF_API_KEY` (Cloudflare API Key, include your CF Account ID if using cloudflare ) in .env with your own API Key
5. Run ``yarn dev` to start a development environment
6. If everything runs well, visit localhost:8000/docs for the apis and localhost:5173 for the frontend
7. Run ``yarn start` to start a production-ready environment
