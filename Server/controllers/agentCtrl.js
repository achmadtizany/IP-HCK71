const { Agent } = require("../models/index")
const {Op} = require("sequelize")


class agentCtrl {
    static async getAgent(req, res, next) {
        try {
            const { filter, search, sort, page } = req.query
            const condition = {
                where: {},
            }
            if (filter) {
                condition.where = {
                    agentRole: filter
                }
            }

            if(search) {
                console.log(condition.where,"<><>");
                condition.where = {
                    agentName: {
                        [Op.iLike]: `%${search}%`
                    }
                }         
            }
    
            if (sort) {
                const ordering = sort[0] === '-' ? 'DESC' : 'ASC'
                const column = ordering === 'DESC' ? sort.slice(1) : sort

                condition.order = [
                    [column, ordering]
                ]
            }
            let limit = 4
            let pageNumber = 1
            if (page) {
                if (page.size) {
                    limit = +page.size
                    condition.limit = limit
                } else {
                    condition.limit = limit
                }

                if (page.number) {
                    pageNumber = +page.number
                    condition.offset = limit * (pageNumber - 1)
                }
            }


            const agent = await Agent.findAll(condition)
            res.status(200).json(agent)

        } catch (error) {
            next(error)
        }
    }

    static async getAgentById(req, res, next) {
        try {
            const { id } = req.params
            const agents = await Agent.findByPk(id)
            if (!agents) throw { name: "Not Found" }

            const data = {
                agentName: agents.agentName,
                nickName: agents.nickName,
                description: agents.description,
                imgUrl: agents.imgUrl,
                agentRole: agents.agentRole,
                agentDescription: agents.agentDescription,
                abilities: agents.abilities

            }
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }

    }
    static async updateAgent(req, res, next) {
        try {
            const agentId = req.params.id

            const { agentName, imgUrl, nickName, description, agentRole, agentDescription, abilities } = req.body

            const agents = await Agent.findByPk(agentId)
            if (!agents) throw { name: "Not Found" }

            const updated = await agents.update({ description, agentRole, imgUrl, agentName, nickName, agentDescription, abilities })
            res.status(200).json({
                message: `Sukses MengUpdate data`, data: {
                    id: agents.id,
                    agentName: agents.agentName,
                    nickName: agents.nickName,
                    description: agents.description,
                    imgUrl: agents.imgUrl,
                    agentRole: agents.agentRole,
                    agentDescription: agents.agentDescription,
                    abilities: agents.abilities
                }
            })

        } catch (error) {
            // console.log(error);
            next(error)
        }
    }

    static async deleteAgent(req, res, next) {
        try {
            const agents = await Agent.findByPk(req.params.id)
            if (!agents) throw { name: "Not Found" }
            await agents.destroy()

            res.status(200).json({ message: `Sukses Delete Data ${req.params.id}` })
        } catch (error) {
            next(error)
        }
    }

    static async addAgent(req, res, next) {
        try {
            const agents = await Agent.create(req.body)

            res.status(201).json(agents)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = { agentCtrl }