const {Client,Intents, MessageEmbed, MessageActionRow} = require("discord.js");
const request=require('request');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const prefix='!poblemas';
const pURL='https://leetcode.com/problems/';
const pFacil=[];
const pMedio=[];
const pDif=[];
const argv=require('yargs').argv;
let direccion=argv.direccion;
let apiURL='https://leetcode.com/api/problems/all/';
request({
  url:apiURL,
  json:true
},(error, response, body)=>{
  var i;
  const t=body.stat_status_pairs[2].stat.frontend_question_id;
  /*
  console.log(v);
  console.log(t);
  */
  for(i=0;i<t;i++){
    const x=JSON.stringify(body.stat_status_pairs[i].difficulty.level);
    const v=body.stat_status_pairs[i].paid_only;
    if(x==1 && v==false){
      //console.log(JSON.stringify(body.stat_status_pairs[i].stat.question__title_slug));
      pFacil.push(JSON.stringify(body.stat_status_pairs[i].stat.question__title_slug));
    }else if(x==2 && v==false){
      pMedio.push(JSON.stringify(body.stat_status_pairs[i].stat.question__title_slug));
    }else if(x==3 && v==false){
      pDif.push(JSON.stringify(body.stat_status_pairs[i].stat.question__title_slug));
    }
  }
});
client.on("ready", () => {
    console.log("Estoy listo como "+client.user.tag );
 });
 
client.on("message", (message) => {
  var st='http://leetcode.com/problems/'
  if(message.content === ("!pfacil")) {
    var i=Math.floor(Math.random()*(pFacil.length+1));
    var res=pFacil[i];
    message.channel.send(st+res.substring(1,res.length-1)+'/');
  }else if(message.content === ('!pmedio')){
    var i=Math.floor(Math.random()*(pMedio.length+1));
    var res=pMedio[i];
    message.channel.send(st+res.substring(1,res.length-1)+'/');
  }else if(message.content === ('!pdificil')){
    var i=Math.floor(Math.random()*(pDif.length+1));
    var res=pDif[i];
    message.channel.send(st+res.substring(1,res.length-1)+'/');
  }else if(message.content===('!ayuda')){
    
    const embed = new MessageEmbed()
      .setTitle('some title')
      .setDescription('some description')
      

    // Discord.js v13
    // These two are the same thing
    //message.channel.send({embeds: [embed]})
    message.channel.send({
      embeds: [{
        title: 'Opciones : ',
        color: 'BLUE',
        description: '**!pfacil :** Problema aleatorio de dificultad "easy" de Leetcode \n'+
                     '**!pmedio :** Problema aleatorio de dificultad "medium" de Leetcode \n'+
                     '**!pdificil :** Problema aleatorio de dificultad "hard" de Leetcode \n'

      }]
    })
  }
});
 client.login("TuContraseñaDiscord");