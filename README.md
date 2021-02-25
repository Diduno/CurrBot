# CurrBot
A Discord currency bot for \[nation name]

## Setup
1. Clone this repository
2. `npm ci` or `npm install`
3. `npx sequelize-cli db:migrate`
4. Create a file called `cfg.json`, paste the following JSON into it and edit it to your needs
    ```json
    {
        "symbol": "$",
        "token": "<replace this>"
    }
    ```
    `symbol`: The bot's currency's symbol
    `token`: [A Discord bot token](https://www.google.com/search?q=how+to+get+a+discord+bot+token)

5. `npm test` if you're developing or `npm start` if you just need to run the bot