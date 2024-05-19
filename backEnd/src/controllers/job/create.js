import jobModel from "../../models/jobModel.js"
import zodErrorFormat from "../../helpers/zodErrorFormat.js"

const create = async (req, res) => {
    try{
        const job = req.body
        const result = jobModel.validateJobToCreate(job)
        if(!result.success){
            return res.status(400).json({
                error: `Dados de Cadastro Inválido`,
                fields: zodErrorFormat(result.error)
            })
        }
        const newJob = await jobModel.create(result.data)
        return res.json({
            success: `Vaga ${newJob.id} criada com sucesso!`,
            job: newJob
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default create