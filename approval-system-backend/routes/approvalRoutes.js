const express = require("express");

const router = express.Router();

const { getPendingApprovals, approveRequest } = require("../controllers/approvalController");

router.get("/approval/pending", getPendingApprovals);

router.post("/approval/:id/approve", approveRequest);

const { rejectRequest } = require("../controllers/approvalController");

router.post("/approval/:id/reject", rejectRequest);

module.exports = router;