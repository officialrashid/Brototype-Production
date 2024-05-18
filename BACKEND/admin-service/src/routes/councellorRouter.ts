import express from 'express'

const counsellorRouter=express.Router()



counsellorRouter.get('/counsellor/all-counsellors',)
counsellorRouter.post('/counsellor/create-counsellor',)
counsellorRouter.put('/counsellor/update-counsellor',)
counsellorRouter.delete('/counsellor/block-counsellor',)

export {counsellorRouter}