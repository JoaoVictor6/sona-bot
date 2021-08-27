import 'dotenv/config'
import {Client} from 'discord.js'
import messageConfig from './src/utils/commands'
import { MusicController } from './src/Controllers/MusicController'

const client = new Client()

client.on('ready', () => {
  console.log(`Logged in ${client.user?.tag}!`)
})

client.on("message", (message) => {
  const music = new MusicController(message, client)
  const execute = messageConfig(message, { prefix: "!" })

  execute("play", async (args) => {
    if(!args) return 
    await music.execute(args)
  })
})

client.login(process.env.BOT_TOKEN)