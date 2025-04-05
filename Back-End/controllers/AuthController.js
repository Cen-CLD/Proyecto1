const { OAuth2Client } = require('google-auth-library');
const { logError } = require('../utils/logger');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleSignIn = async (req, res) => {
    const { id_token } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: id_token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { name, email, picture } = payload;

        const user = {
            nombre: name,
            email,
            img: picture,
        };

        const token = user.id;

        res.json({ user, token });
    } catch (err) {
        logError(err);
        res.status(401).json({ msg: 'Token de Google no válido' });
    }
};
