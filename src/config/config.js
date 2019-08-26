const env = 'development' && 'production';
const configurations = {
    development: {
        api_url: 'http://localhost:5000/sulatroniko-6c3bd/us-central1/api',
        // api_url: 'http://localhost:5000/sulatroniko-1/us-central1/api',
        front_url: 'http://localhost:3000',
    },
    production: {
        api_url: 'https://us-central1-sulatroniko-6c3bd.cloudfunctions.net/api',
        // api_url: 'https://us-central1-sulatroniko-1.cloudfunctions.net/api',
        front_url: 'https://sulatroniko-6c3bd.firebaseapp.com',
    },
}
export default configurations[env];