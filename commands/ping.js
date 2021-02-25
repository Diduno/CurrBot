module.exports = {
    name: 'pingy',
    description: 'pingying lol',
    options: [],
    do: intr => {
        intr.channel.send('ping');
    }
};