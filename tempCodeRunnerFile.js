const Discord=require("discord.js");
const client=new Discord.Client();
client.on("ready", () => {
    console.log("Bot listo");
});
client.login(
    "TuContraseñaDiscord");