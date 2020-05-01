const connection = require('../database/connection')
const jwt = require('jsonwebtoken');

module.exports = {

    async access(req, res) {
        const { username, password } = req.body

        const dbRes = await connection('users').where({ username, password }).first()

        if (dbRes) {

            let user = {
                id: dbRes.id_user,
                name: dbRes.username
            }

            let token = jwt.sign({ user }, process.env.SECRET, {
                expiresIn: 300 //5min
            });

            res.json({ auth: true, token: token, message: 'Usuário logado' });

        } else {

            return res.json({ message: 'O usuário ou senha inválidos' })

        }

    },

    verifyToken(req, res, next) {
        let token = req.headers['authorization'];

        if (!token) return res.status(401).send({ auth: false, message: 'Acesso não autorizado' });
        
        jwt.verify(token, process.env.SECRET, function (err, decoded) {
            
            if (err) return res.status(500).send({ auth: false, message: 'Falha na autenticação do token.' })
            next();
        });
    },

    logout(req, res) {
        res.send({ auth: false, token: null, message: 'Você foi deslogado' });
    }

}