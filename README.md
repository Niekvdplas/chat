This is a [Next.js](https://nextjs.org/) project to create a clone of ChatGPT

## Getting Started

To start the application, run the development server:

```bash
npm run dev
```

## OpenAI API Key

Create a .env file in which you declare the openAI key.

```bash
OPENAI_API_KEY=....
```

## Interesting TODO/followups.

* Connect the application to a database (pref. NoSQL like Firebase)
* Wire through the application to change the chat names based on the user input (with truncation to 20 characters)
* Implement consistency in the chatcompletion prompts by retrieving old user inputs from a database
* Improve the UX by implementing authentication of users.
* Add stretching of the textarea.

