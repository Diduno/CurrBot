# CurrBot
A Discord currency bot for \[nation name]

## Setup
1. Clone this repository
2. `npm ci` or `npm install`
3. `npx sequelize-cli db:migrate`
4. Create a file called `cfg.json`, paste the following JSON into it and edit it to your needs
    ```json
    {
        "symbol": "£",
        "adminPermission": "MANAGE_GUILD",
        "bot": {
            "token": "replace",
            "id": "000000000000000000"
        }
    }
    ```
    `symbol`: The bot's currency's symbol
    `adminPermission`: A [permission](https://discord.js.org/#/docs/main/stable/class/Permissions?scrollTo=s-FLAGS) that a user needs to use admin commands
    `bot`: {
      `token`: [A Discord bot token](https://www.google.com/search?q=how+to+get+a+discord+bot+token)
      `id`: That bot's client ID
    }
5. `npm test` if you're developing (requires `npm install nodemon -g`) or `npm start` if you just need to run the bot