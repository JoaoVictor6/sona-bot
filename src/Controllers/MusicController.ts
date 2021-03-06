import { Client } from "discord.js";
import { Message } from "discord.js";
import internal from "stream";
import ytdl, { MoreVideoDetails } from "ytdl-core";
import MessageController from "./MessageController";

interface PlaylistProps {
  url: string;
  nome: string;
}

export class MusicController{
  private message: Message;
  private client: Client;
  private music: internal.Readable;

  constructor(message: Message, client: Client){
    this.message = message;
    this.client = client;
  }

  async execute(search: string){

    const voiceChannel = this.message.member?.voice.channel;
    if (!voiceChannel)
      return this.message.channel.send(
        "You need to be in a voice channel to play music!"
      );
    
    const permissions = voiceChannel.permissionsFor(this.message.client.user);

    if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
      return new MessageController(
        "Error",
        ["**⚠️I need the permissions to join and speak in your voice channel!⚠️**"],
        "warn",
        this.message
      );
    }

    this.music = ytdl(search)
    const musicInfo = (await ytdl.getInfo(search)).videoDetails
    const thumbnail = this.getThumbnail(musicInfo)

    this.music.on('error', console.error)
    this.music.on("end", () => {
      setInterval(() => voiceChannel.leave(), 40000)
    })
    
    const broadcast = this.client.voice.createBroadcast();
    broadcast.play(this.music)
    
    const connection = await voiceChannel.join()
    connection.play(broadcast)
    return new MessageController(
      "Playing now", 
      [musicInfo.title], 
      "log", 
      this.message,
      thumbnail
      )
  }

  private getThumbnail(musicInfo: MoreVideoDetails){
    const thumbnail = musicInfo.thumbnail.thumbnails[2].url
    return thumbnail;
  }
}