const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const WorldCupInfo = require('./data.json');

const bot = new Telegraf(process.env.BOT_TOKEN);
const text = require('./const.js')

// start
bot.start((ctx)=>{
    ctx.reply("Welcom "+ctx.from.first_name+" "+ctx.from.last_name+" world cup info bot channel tap on /getinfo" );
 
})
jsonLength = WorldCupInfo.length
bot.command('getinfo', async (ctx)=>{
   for(let i = 0 ; i < jsonLength ;i++ ){
       
       
    try{
        
        await ctx.replyWithHTML(WorldCupInfo[i].Date +' '+' Fifa World Cup ',Markup.inlineKeyboard(
            
            [
                [Markup.button.callback(('Get info'),String(WorldCupInfo[i].Date))]
                
            ]
        ))
        bot.action(String(WorldCupInfo[i].Date),async (ctx) => {
            try{
                
                await ctx.answerCbQuery()
                await ctx.reply(WorldCupInfo[i].Date +" "+" Fifa World Cup \n"+
                 "Host country - "+  WorldCupInfo[i].Host_country+
                 "\nDates - "+WorldCupInfo[i].Dates + 
                 "\nTeams Count - " + WorldCupInfo[i].TeamsCount +
                 "\nChampion - "  +WorldCupInfo[i].Champions +
                 "\nSecond place - "+ WorldCupInfo[i].Runners_up +
                 "\nThird place - "  +WorldCupInfo[i].Third_place +
                 "\nFourth place - " +WorldCupInfo[i].Fourth_place +
                 "\nMatches played - " + WorldCupInfo[i].Matches_played +
                 "\nGoals scored - " + WorldCupInfo[i].Goals_scored +
                "\nTop scorer - " + WorldCupInfo[i].Top_scorer+ "\n" + WorldCupInfo[i].link)              
                
            }catch(e){
                console.error(e)
            }
        
        })

    }catch(e){
        console.error(e)
    }
   }
})
// Help

bot.help((ctx)=>{
    ctx.reply(text.commands);
})

// settings
bot.settings((ctx)=>{
    ctx.reply(text.commands);
})


bot.launch();