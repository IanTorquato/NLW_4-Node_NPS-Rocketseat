import 'reflect-metadata'
import express from 'express'

import './database'

const app = express()

app.get('/users', (req, res) => res.json({ message: 'Hello Silbeck' }))

app.listen(3333, () => console.log('Server is running on prot 3333'))