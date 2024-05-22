//const express = require('express')
import express from 'express'
import {PORT, HOST} from './config.js'
import authRouter from './routers/authRouter.js'
import userRouter from './routers/userRouter.js'
import jobRouter from './routers/jobRouter.js'
import logger from './middlewares/logger.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(logger)
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3333', 'http://localhost:3333/:id', 'http://localhost:8081', 'http://localhost:3333/job','http://localhost:3333/job:/id','https://6xfmm-o-anonymous-8081.exp.direct'],
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

app.use('/auth', authRouter)
app.use('/user', userRouter)
app.use('/job', jobRouter)

app.listen(PORT, () => {
  console.log(`Server running on ${HOST}:${PORT}`)
})


