const express = require('express');
const router = express.Router();
const CompositionController = require('../controller/composition');


router.get("/list/", async (req, res) => {
    const compositionsResp = await CompositionController.listAll();
    res.status(200).json(compositionsResp);
})

router.get("/:id", async (req, res) => {
    const proposal = await CompositionController.getProposal(req.params.id);
    res.status(200).json(proposal);
})


router.post('/create', async (req, res, next) => {

    const response = await CompositionController.newComposition(req.body.patient_id, req.body.transplants, req.body.composition);
    if (response.success) {
        res.status(200).json({
            success: true,
            response: "The proposal was successfully created!"
        });
    } else {
        res.status(200).json({
            success: false,
            response: response.response
        });
    }
});

router.post('/update', async (req, res, next) => {
    const id = req.body.proposal_id;

    const response = await CompositionController.updateComposition(id, req.body.patient_id, req.body.transplants, req.body.composition);
    if (response.success) {
        res.status(200).json({
            success: true,
            response: "The proposal was successfully updated!"
        });
    } else {
        res.status(200).json({
            success: false,
            response: "Error saving the proposal. Reason:" + response.response
        });
    }
});
module.exports = router;
