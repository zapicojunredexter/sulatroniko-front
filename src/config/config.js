const env = 'development' || 'production';
const configurations = {
    development: {
        api_url: 'https://us-central1-sulatroniko-6c3bd.cloudfunctions.net/api',
    },
}
export default configurations[env];