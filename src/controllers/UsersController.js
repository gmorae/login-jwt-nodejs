const connection = require('../database/connection')

module.exports = {

    async index(req, res) {
        return res.json(await connection('users').select('*'))
    },

    async indexById(req, res) {
        const { id } = req.params
        return res.json(await connection('users').select('*').where({ id_user: id }))
    },

    async create(req, res) {
        const { username, password } = req.body
        if (!username || !password) {

            res.json({ message: "Preencha todos os campos para que possa realizar o cadastro" })

        } else {

            await connection('users').insert({
                username,
                password
            })

            return res.json({ message: "Usuário cadastrado com sucesso" })
        }
    },

    async edit(req, res) {
        const { id } = req.params
        const { username, password } = req.body

        const verifyId = await connection('users').where({ id_user: id }).first()

        if (verifyId) {

            await connection('users').update({
                username,
                password
            }).where({ id_user: id })

            return res.json({ message: 'Usuário editado com sucesso' })

        } else {

            return res.json({ message: 'O usuário não este' })

        }

    },

    async delete(req, res) {
        const { id } = req.params

        const verifyId = await connection('users').where({ id_user: id }).first()
        if (verifyId) {

            await connection('users').delete().where({ id_user: id })

            return res.json({ message: "Usuário foi deletado com sucesso" })
        } else {

            return res.json({ message: "Naõ foi possivel deletar o usuário" })
        }
    }

}