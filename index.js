const express = require("express");
const app = express();


app.listen(3000, () => {
  console.log("Project is Running");
})
app.get("/", (req, res) => {
res.send("Hello world");
})


const Discord = require("discord.js");
const client = new Discord.Client({intents: ["GUILDS", "GUILD_MESSAGES",]});
const fs = require("fs");
const prefix = "hey";
client.commands = new Discord.Collection();
const commands = fs.readdirSync("./Commands").filter(file => file.endsWith(".js"));
for(file of commands) {
  const commandName = file.split(".")[0]
  const command = require(`./Commands/${commandName}`)
  client.commands.set(commandName, command)
}

client.on('ready', () => {
  client.user.setActivity('hey help', { type: 'PLAYING'})
})

client.on("guildMemberAdd", member => {
  if(member.guild.id === "932552064016457758") {
    client.channels.cache.get("935411461818318858").send(`Welcome ${member}!`)
  }
})//welcome command

client.on("messageCreate", async message => {
if(message.content.startsWith(prefix)) {
  const args = message.content.slice(prefix.length).trim().split(/ +/g)
  const commandName = args.shift()
  const command = client.commands.get(commandName)
  if(!command) return message.channel.send({content: "That command doesnt exist! use hey help for the full list of commands."})
  command.run(client, message, args)
}
})//prefix





client.shop = {
     "car": 80000,
     "fishing rod": 20000,
     "nikes": 350,
     "mansion": 1200000
}


client.on("guildMemberAdd", async (member) => {
  let userjson = JSON.parse(fs.readFileSync("./DB/user.json"));
  userjson[member.id] = {
                warns: 0
            }
            fs.writeFileSync("./DB/user.json", JSON.stringify(userjson));
})




let badWords = ["fuck", "bitch", "dick", "cock", "pussy", "chutiya", "vedant", "motherfucker", "salee", "sala", "Benchod", "Kuta", "Kutiya", "madarchod", "shit"]
client.on("messageCreate", async message => {
  let userjson = JSON.parse(fs.readFileSync("./DB/user.json"));

  if (!userjson[message.author.id]) {
    if (message.author.bot) return;
    userjson[message.author.id] = {
      warns: 0
    }
    fs.writeFileSync("./DB/user.json", JSON.stringify(userjson));
  }
for (i = 0; i < badWords.length; i++) {
if (message.content.toLowerCase().includes(badWords[i])) {
await message.delete();
message.channel.send(`Hey ${message.author} No bad words man!`);
message.author.send(`Hey ${message.author}, You just said a really bad word in the Grade 7 discord server, you have recieved 1 warning.`)





            userjson[message.author.id].warns += 1;
            fs.writeFileSync("./DB/user.json", JSON.stringify(userjson));



if (userjson[message.author.id].warns === 3) {
 
(fs.readFileSync("./DB/user.json"));
  userjson[message.author.id].warns = 0;
  fs.writeFileSync("./DB/user.json", JSON.stringify(userjson));

  const user = message.member
  let role = message.guild.roles.cache.find(r => r.name === "Muted");

  user.roles.add(role)
  message.channel.send(`I muted ${message.author} because he said a really bad word you do not wanna know`)
  message.author.send(`${message.author}, you have been temp muted since you have recieved 3 warnings. You will be unmuted after 10 min`)
}
        }
    }
})

client.login(process.env.token)


const mySecret = process.env['token'];
client.login(process.env.token);
