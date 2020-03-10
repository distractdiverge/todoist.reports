import * as r from 'ramda';
import * as dotenv from 'dotenv';
import * as Todoist from './todoist.client';
import { getConfig } from './config';

// TODO: Pretty Print Report
const printReport = r.forEach(
    item => {
        console.log(`${item.completed_date}: ${item.content}`)
    });

const main = async (): Promise<void> => {
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

if (require.main === module) {
    dotenv.config();
    main()
        .then(() => console.log('Done'))
        .catch(e => console.error(`Error: ${e.message}`));
}