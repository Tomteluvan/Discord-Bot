const {} = require('../../../config.json');
const getLocalCommands = require('../../utils/getLocalCommands');

module.exports = (client) => {
    const localCommands = getLocalCommands();

    try {
        
    } catch (error) {
        console.log('There was an error: ${error}');
    }
}