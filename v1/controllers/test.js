const Model = require('../../models/mongo')



module.exports.signup = async (req, res, next) => {
    try {
        const { username, phone, password } = req?.body

        if (!username || !phone || !password) {
            return res.error(400, "All Field are required")
        }
        const GetData = await Model.Test.findOne({ phone })

        if (GetData) return res.error(400, "you are already signup , Login using username")
        const data = await Model.Test.findOne({ phone })

        if (data) return res.error(400, "use other username")
        const insertData = {
            username, phone, password
        }
        const inserting = await Model.Test.create(insertData)
        console.log({ inserting })
        return res.success("signup Successfully")

    } catch (error) {
        next(error)
    }
}


module.exports.login = async (req, res, next) => {
    try {
        const { username, password } = req?.body

        if (!username || !password) {
            return res.error(400, "All Field are required")
        }
        const GetData = await Model.Test.findOne({ username })

        if (!GetData) return res.error(400, "you are not signup , Please signup")

        if (password === GetData.password) {
            return res.success("signup Successfully", true)
        } else {
            return res.error(400, "Wrong password , Please try again")
        }

    } catch (error) {
        next(error)
    }
}


module.exports.calculate = async (req, res, next) => {
    try {
        const { UserName } = req?.query
        if (!UserName) return res.error(400, "UserName")

        const GetData = await Model.Test.findOne({ UserName: UserName })
        console.log({ GetData })
        return res.success("data Get Sucessfully", GetData)

    } catch (error) {
        next(error)
    }
} 