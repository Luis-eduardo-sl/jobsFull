import jobModel from "../../models/jobModel.js"

const getById = async (req, res) => {
    try{
        const id = req.params.id
        const job = await jobModel.getById(+id)
        res.json({
            success: `Vaga ${id} encontrada com sucesso!`,
            job
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default getById