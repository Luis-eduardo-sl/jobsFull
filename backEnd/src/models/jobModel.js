import { PrismaClient } from '@prisma/client'
import { z } from "zod"
import Joi from 'joi';

const prisma = new PrismaClient()

const jobSchema = z.object({
    id: z.number({
        required_error: "ID é obrigatório.",
        invalid_type_error: "O ID deve ser um número inteiro.",
      }),
    companyFunction: z.string({
        required_error: "O cargo da vaga é obrigatória.",
        invalid_type_error: "A cargo da vaga deve ser uma string.",
      })
      .max(250, {message: 'A cargo da vaga deve ter no máximo 250 caracteres.'}),
    companyName: z.string({
        required_error: "Nome da empresa é obrigatório.",
        invalid_type_error: "O nome da empresa deve ser uma string.",
      })
      .max(250, {message: 'O nome da empresa deve ter no máximo 250 caracteres.'}),
    companyLocation: z.string({
        required_error: "Localização da empresa é obrigatória.",
        invalid_type_error: "A localização da empresa deve ser uma string.",
      })
      .max(250, {message: 'A localização da empresa deve ter no máximo 250 caracteres.'}),
    salary: z.string({
        required_error: "Salário é obrigatório.",
        invalid_type_error: "O salário deve ser uma string.",
      })
      .max(250, {message: 'O salário deve ter no máximo 250 caracteres.'}),
    companyLogo: z.string({
        required_error: "Logo da empresa é obrigatório.",
        invalid_type_error: "O logo da empresa deve ser uma string.",
      }),
      jobDescription: z.string({
        required_error: "Descrição do trabalho é obrigatória.",
        invalid_type_error: "A descrição do trabalho deve ser uma string.",
      })
})

const validateJobToCreate = (job) => {
    const partialJobSchema = jobSchema.partial({id: true})
    return partialJobSchema.safeParse(job)
}

function validateJobToUpdate(job) {
    const schema = Joi.object({
        // seu esquema aqui
    }).options({ abortEarly: false, allowUnknown: true, stripUnknown: true });

    const { error, value } = schema.validate(job);
    if (error) {
        return {
            success: false,
            error: new Error(`Invalid job data. ${error.message}`)
        };
    }
    return {
        success: true,
        value
    };
}

const getAll = async () => {
    return await prisma.job.findMany({
        select: {
            id: true,
            companyFunction: true,
            companyName: true,
            companyLocation: true,
            salary: true,
            companyLogo: true,
            jobDescription: true  
        }
    })
}

const getById = async (id) => {
    return await prisma.job.findUnique({
        where: {
            id
        },
        select: {
            id: true,
            companyFunction: true,
            companyName: true,
            companyLocation: true,
            salary: true,
            companyLogo: true,
            jobDescription: true  
        }
    })
}

const create = async (job) => {
    return await prisma.job.create({
        data: job,
        select: {
            id: true,
            companyFunction: true,
            companyName: true,
            companyLocation: true,
            salary: true,
            companyLogo: true,
            jobDescription: true  
        }
    })
}

const remove = async (id) => {
    return await prisma.job.delete({
        where: {
            id
        },
        select: {
            id: true,
            companyFunction: true,
            companyName: true,
            companyLocation: true,
            salary: true,
            companyLogo: true
        }
    })
}

const edit = async (id, updatedFields) => {
    // delete updatedFields.jobDescription; // remove this line

    return await prisma.job.update({
        where: {
            id: id
        },
        data: updatedFields,
        select: {
            id: true,
            companyFunction: true,
            companyName: true,
            companyLocation: true,
            salary: true,
            companyLogo: true,
            jobDescription: true  
        }
    })
}

export default {getAll, getById, create, remove, edit, validateJobToCreate, validateJobToUpdate}