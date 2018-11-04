const botconfig = require("./botconfig.json");
const Discord = require("discord.js");

const bot = new Discord.Client({disableEveryone: true});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is currenty online :D`);
  bot.user.setActivity("!bothelp | ⚠ maintenance");
});

bot.on("message", async message => {
  if (message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

if (cmd === `${prefix}kickuser`){

  //!kick @daeshan askin for it

  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.send(":x: Can't find that user! Was it a typing mistake, or does that user even exist? XD");
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Sorry you don't have the permission ");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be kicked, sorry");

  let kickEmbed = new Discord.RichEmbed()
.setDescription(":white_check_mark: kicked")
.setColor("#e56b00")
.addField("Kicked User", `${kUser} with ID ${kUser.id}`)
.addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("Kicked In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason for kick", kReason);

let kickChannel = message.guild.channels.find(`name`, "cooldudebot-log");
if(!kickChannel) return message.channel.send(":x: I can't seem to find the cooldudebot-log channel, maybe you should create it?");

message.guild.member(kUser).kick(kReason);
kickChannel.send(kickEmbed);

  return;

}

if(cmd === `${prefix}banuser`){

  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.channel.send(":x: Can't find that user! Was it a typing mistake, or does that user even exist? XD");
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: Sorry you don't have the permission ");
  if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send(":x: That person can't be banned, sorry");

  let kickEmbed = new Discord.RichEmbed()
.setDescription(":white_check_mark: banned")
.setColor("#e56b00")
.addField("Banned User", `${bUser} with ID ${bUser.id}`)
.addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
.addField("banned In", message.channel)
.addField("Time", message.createdAt)
.addField("Reason for ban", bReason);

let banChannel = message.guild.channels.find(`name`, "cooldudebot-log");
if(!banChannel) return message.channel.send(":x: I can't seem to find the cooldudebot-log channel, maybe you should create it?");


  return;
}




if(cmd === `${prefix}serverinfo`){

let sicon = message.guild.iconURL;
let serverembed = new Discord.RichEmbed()
.setDescription("Server Information")
.setColor("#42d1f4")
.setThumbnail(sicon)
.addField(":pencil2: > Server Name", message.guild.name)
.addField(":calendar_spiral: > Date Created", message.guild.createdAt)
.addField(":clock3: > You Joined", message.member.joinedAt)
.addField(":1234: >Total Members", message.guild.memberCount)

  return message.channel.send(serverembed);
}

if(cmd === `${prefix}hello`){
  return message.channel.send("Hello, I am CooldudeBot!");
}

if(cmd === `${prefix}botinfo`){

let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("CooldudeBot Information")
  .setColor("#42d1f4")
  .setThumbnail(bicon)
  .addField(":pencil2: > Bot Name", bot.user.username)
  .addField(":calendar_spiral: > Created ", bot.user.createdAt)
  .addField(":clock1: > Bot Version"," v0.7.1 BETA")

return message.channel.send(botembed);
}

if(cmd === `${prefix}botsettings`){

let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setDescription("**:tools: CooldudeBot Mod Configuration**")
  .setColor("#ff3b00")
  .setThumbnail(bicon)
  .addField(":keyboard: Commands list","!commands")
  .addField(":exclamation: Change prefix","!setprefix (Prefix sign)")
  .addField(":musical_note: Music","CooldudeMusic Coming soon! ")
  .addField("✅ Select a log channel","!setlog (channel) / disable Coming soon");

return message.channel.send(botembed)
}

if (cmd === `${prefix}bothelp`){

let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setColor("#ff3b00")
  .setDescription("**:tools: CooldudeBot Help Suggestions**")
  .setThumbnail(bicon)
  .addField(":exclamation: Commands","Run the !commands command")
  .addField(":earth_americas: Website","http://cooldudebot.weebly.com/")
  .addField(":arrow_right: Join the discord server","https://discord.gg/J3nH2y5")
  .addField(":spider: Bug reports","Join the discord and report a bug")
  .addField(":page_facing_up: Documentation", "Coming soon!!!");

  return message.channel.send(botembed)
}

if (cmd === `${prefix}commands`){
  let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setColor("#ff3b00")
    .setDescription("**:tools: CooldudeBot Commands**")
    .setThumbnail(bicon)
    .addField(":wastebasket: Utility Commands", "\`botinfo\` \`commands\` \`bothelp\` \`serverinfo\` \`setprefix\` \`botsettings\`")
    .addField(":star: Moderation Commands", "\`banuser\` \`kickuser\` \`tempmute\` \`clear\` \`---\` \`---\` \`---\`")
    .addField(":tada: Fun Commands", "\`hello\` \`fortnitestats (Coming in a later version)\`")
    .addField(":page_facing_up: Documentation", "Coming soon!!!");
    return message.channel.send(botembed)
  }


if (cmd === `${prefix}tempmute`){
  return message.channel.send("⚠ Command under maintenance")

}







});


bot.login(botconfig.token);
