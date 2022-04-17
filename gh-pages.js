var ghpages = require('gh-pages');

ghpages.publish(
    'public', // path to public directory
    {
        branch: 'gh-pages',
        repo: 'https://github.com/mixemer/email_spam_database.git', // Update to point to your repository  
        user: {
            name: 'mixemer', // update to use your name
            email: 'mehmetshin96@gmail.com' // Update to use your email
        }
    },
    () => {
        console.log('Deploy Complete!')
    }
)