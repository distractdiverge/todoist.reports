interface Config {
    baseUrl: string;
    personalApiKey: string;
    clientId: string;
    clientSecret: string;
}

const getConfig = (): Config => ({
    baseUrl:        process.env.BASE_URL || undefined,
    personalApiKey: process.env.PERSONAL_API_KEY || undefined,
    clientId:       process.env.CLIENT_ID || undefined,
    clientSecret:   process.env.CLIENT_SECRET || undefined,

});

export {
    Config,
    getConfig,
}