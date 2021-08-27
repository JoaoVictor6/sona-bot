import { Message, MessageEmbed } from "discord.js"

type messageTypeProps = "warn" | "log"

const colorStyle = {
  warn: "#E9BE0F",
  log: "#EB86BB"
}

export default class MessageController{
  constructor(
    title: string, 
    messageContent: string[], 
    messageType:messageTypeProps, 
    message: Message, 
    thumbnail?: string,
    viewAuthor?: boolean
    )
  {
    const messageValue = messageContent
      .reduce((prev, current) => `${prev}\n${current}`)

    const embed = new MessageEmbed({
      color: colorStyle[messageType],
      thumbnail: {
        url: thumbnail
      },
      fields: [
        {
          name: title,
          value: messageValue,
          inline: true
        }
      ]
    })
    if(viewAuthor){
      embed.setAuthor("Sona", "https://1.bp.blogspot.com/-m4bM73Rig70/Xymx56DFnII/AAAAAAABqBw/N8Oh5UeJEykllBnZOjnjsgBjHOq1hngfACLcBGAsYHQ/s200/4673.jpg", "https://github.com/JoaoVictor6/sona-bot")
    } 
    return message.reply(embed)
  }
}