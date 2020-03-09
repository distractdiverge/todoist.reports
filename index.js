const r = require('ramda');
const dotenv = require('dotenv');
const Todoist = require('./todoist.client');

const getConfig = () => ({
    baseUrl:        process.env.BASE_URL || undefined,
    personalApiKey: process.env.PERSONAL_API_KEY || undefined,
    clientId:       process.env.CLIENT_ID || undefined,
    clientSecret:   process.env.CLIENT_SECRET || undefined,

});

const main = async () => {
    const config = getConfig();

    console.log('Getting Auth Token');
    const token = await Todoist.getAuthToken(
        config.baseUrl,
        config.clientId,
        config.clientSecret,
        config.personalApiKey,
    );
    console.log(`Auth Token: ${JSON.stringify(token)}`);

    const client = Todoist.getClient(config.baseUrl, token);

    const workProjectId = 2004774015;
    const completedItems = await Todoist.getCompletedItems(client, workProjectId);

    console.log(`Got ${completedItems.length} items`);

    printReport(completedItems);
};

// TODO: Pretty Print Report
const printReport = r.forEach(
    item => {
        console.log(`${item.completed_date}: ${item.content}`)
    });


if (require.main === module) {
    dotenv.config();
    main()
        .then(() => console.log('Done'))
        .catch(e => console.error(`Error: ${e.message}`));
}