import Axios, { AxiosInstance } from 'axios';

interface CompletedItem {
    content: string;
    legacy_project_id: number;
    meta_data: object;
    user_id: number;
    task_id: number;
    project_id: number;
    completed_date: Date;
    id: number;
}

const getClient = (baseUrl: string, token: string): AxiosInstance =>
    Axios.create({
        baseURL: baseUrl,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
            'Accept-Encoding': 'br, gzip, compress, deflate',
        },
    });

const getAuthToken = (baseUrl: string, clientId: string, clientSecret: string, personalKey: string): Promise<string> =>
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

const getCompletedItems = (client: AxiosInstance, projectId: string): Promise<CompletedItem[]> =>
    client(`/sync/v8/completed/get_all?project_id=${projectId}`)
    .then(response => {
        if (response.status !== 200) {
            throw new Error('Unable to get Completed Items');
        }

        return response.data.items;
    });


export {
    getCompletedItems,
    getAuthToken,
    getClient,
}