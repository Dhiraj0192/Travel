import express from "express"
import { GoogleOAuthCallback, Login, Logout, Register, GoogleLogin } from "../controllers/Auth.controller.js"

const AuthRoute = express.Router()

AuthRoute.post('/register', Register)
AuthRoute.post('/login', Login)
AuthRoute.post('/google-login', GoogleLogin)

AuthRoute.get('/logout', Logout)
AuthRoute.get('/google', (req, res) => {
  const redirectUri =  'https://api.travelersmirror.com/api/auth/google/callback';
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const scope = 'openid email profile';
  const state = 'state123'; // In production, generate a random state
  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}&access_type=offline&prompt=consent`;
  res.redirect(url);
});

AuthRoute.get('/google/callback', GoogleOAuthCallback);

export default AuthRoute