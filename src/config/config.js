const env = 'development' || 'production';
const configurations = {
    development: {
        api_url: 'http://localhost:5000/sulatroniko-6c3bd/us-central1/api',
    },
    production: {
        api_url: 'https://us-central1-sulatroniko-6c3bd.cloudfunctions.net/api',
    },
}
export default configurations[env];