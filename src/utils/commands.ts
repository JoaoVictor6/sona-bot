import { Message } from "discord.js";

type callBackFunction = ( args: string) => void;
type ConfigProps = {
  prefix: string;
  channelRestrict?: [boolean, [channel: string]]
}

export default function messageConfig(message: Message,{prefix}
  : ConfigProps):(command: string, callback: callBackFunction) => void {
  return (command: string, callback: callBackFunction) => {
    if(message.content.split(" ")[0] === `${prefix}${command}`){
      const command = message.content.split(" ")
      command.shift()
      callback(command.join(" "))
    }
  } 
}