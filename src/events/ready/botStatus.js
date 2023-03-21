const { ActivityType } = require('discord.js');

module.exports = (client) => {
    const statuses = [
        {
          name: "Andrew Tate vape video",
          type: ActivityType.Watching,
        },
        {
            name: "Bing Bong",
            type: ActivityType.Listening,
        },
        {
            name: "How to griddy",
            type: ActivityType.Watching,
        },
        {
            name: "How to get sturdy",
            type: ActivityType.Watching,
        },
      ];
    setInterval(() => {
      let random = Math.floor(Math.random() * statuses.length);
      client.user.setActivity(statuses[random]);
    }, 60000);
  };