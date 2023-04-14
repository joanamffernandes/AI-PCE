const express = require('express');
const router = express.Router();
const CompositionController = require('../controller/composition');


router.get("/list/", async (req, res) => {
    const compResponse = await CompositionController.listComposition();
    res.status(200).json(compResponse.compositions);
})

router.post('/save', async (req, res, next) => {

    const response = await CompositionController.newComposition(req.body.erh_id, req.body.composition)
    if (response.success) {
        res.status(200).json({success: true, message: "Composition " + req.params.id + " criada com sucesso!"});
    } else {
        res.status(200).json({
            success: false,
            message: "Erro a criar a composition " + req.params.id + ". Motivo: " + response.response
        });
    }

});

module.exports = router;
