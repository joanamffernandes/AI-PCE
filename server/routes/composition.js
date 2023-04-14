const express = require('express');
const router = express.Router();
const CompositionController = require('../controller/composition');


router.get("/list/", async (req, res) => {
    const compResponse = await CompositionController.listComposition();
    res.status(200).json(compResponse.compositions);
})

router.post('/save', async (req, res, next) => {
    const id = req.body.erh_id;
    const response = await CompositionController.newComposition(id, req.body.composition)
    if (response.success) {
        res.status(200).json({success: true, response: "Composition " + id + " criada com sucesso!"});
    } else {
        res.status(200).json({
            success: false,
            response: "Erro a criar a composition " + id + ". Motivo: " + response.response
        });
    }

});

module.exports = router;
