const Discord = require('discord.js');
const interactions = require('discord-slash-commands-client');
const bot = new Discord.Client();
const db = require('./models');
const cfg = require('./cfg');
bot.interactions = new interactions.Client(cfg.bot.token, cfg.bot.id);
const commands = require('./commands');

function checkUser(user) {
    return new Promise(async (res, rej) => {
        if (await db.Account.findOne({where: {user: user.id}}) == null) //if the user doesn't have a (bank) account
            db.Account.create({ //create an empty one for them
                user: user.id,
                balance: 0,
            });
    });
}
bot.on('guildMemberAdd', member => checkUser(user)); //when someone joins a server this bot is in, check the user has an account

bot.on('ready', () => {
    console.log('Connected to Discord!');
    bot.users.cache.each(user => checkUser(user)); //check every user

    //register commands
    bot.interactions.getCommands().then(cmds => { //get all currently registered commands from discord
        let seen = [];

        let discordCommandDetails = c => ({
            name: c.name,
            description: c.description,
            ...(c.options.length > 0 ? {options: c.options} : {}) //include options if the command has at least one option
        });

        for (let cmd of cmds) { //for each discord command,
            bot.interactions.deleteCommand(cmd.id).then(() => { //delete the command, and when discord says that's done,
                let command = commands.find(c => c.name == cmd.name); //search for a command with the name of the one we just deleted from discord,
                if (command != null) //and if one was found,
                    bot.interactions.createCommand(discordCommandDetails(command)); //create a new discord command using that command's details.
            });
            seen.push(cmd.name); //record that the command with this name has been registered.
        }

        //this part is for any new commands which have been made since the last time the bot run
        for (let command of commands) { //for each command,
            if (!seen.includes(command.name)) { //if we haven't just made a command with the same name (in the upper block of code),
                bot.interactions.createCommand(discordCommandDetails(command)); //create the discord command.
            }
        }
    });
});

bot.on('interactionCreate', intr => { //intr for interaction - this is run when a slash command is used
    let command = commands.find(c => c.name == intr.name); //search for a command with the used commands named,
    if (command != null) //and if one was found,
        command.do(intr); //run that command.
});

bot.login(cfg.bot.token);