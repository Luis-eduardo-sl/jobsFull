import express from 'express'
import listAll from '../controllers/job/listAll.js'
import getById from '../controllers/job/getById.js'
import create from '../controllers/job/create.js'
import update from '../controllers/job/update.js'
import remove from '../controllers/job/remove.js'

const router = express.Router()

router.get('/', listAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router