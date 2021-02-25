module.exports = {
    name: 'pay',
    description: 'pay someone money (not done)',
    options: [],
    do: intr => {
        intr.channel.send('will pay');
    }
};