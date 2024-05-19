import jobModel from "../../models/jobModel.js"

const listAll = async (req, res) => {
    try{
        const jobs = await jobModel.getAll()
        return res.json({
            success: 'Vagas listadas com sucesso!',
            jobs
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default listAll