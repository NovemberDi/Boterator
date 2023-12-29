const jwt = require('jsonwebtoken')


const { clientId, clientSecret, port } = require('../config.json');
const { request } = require('undici');

module.exports = async function (req, resp, next){
    const { code } = req.body;
	
		if (!code) next();
		console.log('Есть код '+code)
		try {
			const tokenResponseData = await request('https://discord.com/api/oauth2/token', {
				method: 'POST',
				body: new URLSearchParams({
					client_id: clientId,
					client_secret: clientSecret,
					code,
					grant_type: 'authorization_code',
					redirect_uri: `http://192.168.0.105:${port}`,
					scope: 'identify',
				}).toString(),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
			});
			// console.log(tokenResponseData)
			const oauthData = await tokenResponseData.body.json();
			// console.log(oauthData)
			let userResult = await request('https://discord.com/api/users/@me', {
				headers: {
					authorization: `${oauthData.token_type} ${oauthData.access_token}`,
				},
			});

			userResult = await userResult.body.json();
			req.idUser = userResult.id;
			console.log(userResult.id)
			next()
			
		} catch (error) {
			console.error(error);
		}
		next()
	};
	

