import jobModel from "../../models/jobModel.js"

const remove = async (req, res) => {
    try{
        const id = +req.params.id

        const result = await jobModel.remove(+id)
        res.json({
            success: `Vaga ${id} apagada com sucesso!`,
            job: result
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default remove