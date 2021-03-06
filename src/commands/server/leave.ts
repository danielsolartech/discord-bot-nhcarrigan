import CommandInt from "@Interfaces/CommandInt";

const leave: CommandInt = {
  name: "leave",
  description:
    "Can tell the bot to leave a specific server. Gives a list of servers the bot is in. Pass the ID of the target server as the parameter to leave that server. This command is specific to nhcarrigan.",
  parameters: ["<?serverID>: the ID of the server to leave"],
  run: async (message) => {
    try {
      const { author, bot, commandArguments } = message;

      const { guilds } = bot;

      // Check if the author id is not the owner id.
      if (author.id !== process.env.OWNER_ID) {
        await message.reply(
          "I am so sorry, but I can only do this for nhcarrigan."
        );

        return;
      }

      // Get the next argument as the server id.
      const serverID = commandArguments.shift();

      // Check if the server id is empty - return list of servers.
      if (!serverID || !serverID.length) {
        await message.reply(
          "Would you please try the command again, and provide the server ID you wish for me to leave?"
        );
        return;
      }

      // Get the target guild.
      const targetGuild = guilds.cache.get(serverID);

      // Check if the target guild is not valid.
      if (!targetGuild) {
        await message.reply(
          `I am so sorry, but \`${serverID}\` is not a valid server ID.`
        );

        return;
      }

      // Leave the target guild.
      await targetGuild.leave();
    } catch (error) {
      console.log(
        `${message.guild?.name} had the following error with the leave command:`
      );
      console.log(error);
      message.reply("I am so sorry, but I cannot do that at the moment.");
    }
  },
};

export default leave;
