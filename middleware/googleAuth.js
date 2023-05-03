const { google } = require('googleapis');
const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CALLBACK_URL
);

const googleAuth = {
    async authenticate(req, res) {
        try {
            // to set up the Google OAuth client
           

            //To initiate the OAuth flow
            const authUrl = oauth2Client.generateAuthUrl({
                access_type: 'offline',
                scope: ['https://www.googleapis.com/auth/userinfo.email'],
            });

            // Redirect the user to the auth URL
            res.redirect(authUrl);

            const { tokens } = await oauth2Client.getToken(code);

            // Save the access token and refresh token
            const accessToken = tokens.access_token;
            const refreshToken = tokens.refresh_token;


            const { data } = await google.oauth2({
                auth: oauth2Client,
                version: 'v2',
            }).userinfo.get();

            const email = data.email;

        }
        catch (err) {
            console.log(err);
        }
    }
}

module.exports = googleAuth;