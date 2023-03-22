require('dotenv').config();

// Prepare to connect to Discord bot client
const {Client, GatewayIntentBits} = require('discord.js');
const client = new Client({intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
]})

// Prepare to connect to OPENAI API
const { Configuration, OpenAIApi} = require('openai');
const configuration = new Configuration({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_TOKEN,
});
const openai = new OpenAIApi(configuration);

// Check for a message on discord
client.on('messageCreate', async function(message){
    try {
        if(message.author.bot) return;
        console.log(message.content);
        const gptResponse = await openai.createCompletion({
            model:"text-davinci-003",
            prompt: message.content
        })
        // message.reply(`You said: ${message.content}`)
        message.reply(`${gptResponse.data.choices[0].text}`)

        console.log(gptResponse.data.choices)
        return;
        
    } catch(err) {
        console.log(err);
    }
});

console.log("DISCORD BOT IS RUNNING...")
client.login(process.env.DISCORD_TOKEN);

