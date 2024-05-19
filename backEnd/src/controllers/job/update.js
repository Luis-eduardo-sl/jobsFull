import jobModel from "../../models/jobModel.js"
import zodErrorFormat from "../../helpers/zodErrorFormat.js"

const update = async (req, res) => {
    try{ 
        const fieldsToUpdate = req.body;
        const id = +req.params.id;

        const result = jobModel.validateJobToUpdate(fieldsToUpdate);
        if(!result.success){
            if(result.error) {
                return res.status(400).json({
                    error: `Dados de Atualização Inválido`,
                    fields: zodErrorFormat(result.error)
                })
            } else {
                return res.status(400).json({
                    error: `Dados de Atualização Inválido, mas nenhum detalhe de erro foi fornecido`
                })
            }
        }
        const jobEdited = await jobModel.edit(id, fieldsToUpdate);
        res.json({
            success: `Vaga ${jobEdited.id} editada com sucesso!`,
            job: jobEdited
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: 'Opsss erro no servidor, tente novamente!'
        })
    }
}

export default update