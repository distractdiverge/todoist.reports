const Axios = require('axios');

const getClient = (baseUrl, token) =>
    Axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'br, gzip, compress, deflate',
        },
    })

const getAuthToken = (baseUrl, clientId, clientSecret, personalKey) =>
    Axios({
        baseURL: baseUrl,
        url: '/sync/v8/access_tokens/migrate_personal_token',
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'br, gzip, compress, deflate',
        },
        data: {
            'client_id':      clientId, 
            'client_secret':  clientSecret,
            'personal_token': personalKey,
            'scope':          'data:read',
        },
    })
    .then(response => {
        if (response.status !== 200) {
            throw new Error('Unable to exchange tokens');
        }

        // TODO: Make more functional w/ Ramda

        return response.data.access_token;
    });

const getCompletedItems = (client, projectId) =>
    client(`/sync/v8/completed/get_all?project_id=${projectId}`)
    .then(response => {
        if (response.status !== 200) {
            throw new Error('Unable to get Completed Items');
        }

        return response.data.items;
    });


module.exports = {
    getCompletedItems,
    getAuthToken,
    getClient,
};