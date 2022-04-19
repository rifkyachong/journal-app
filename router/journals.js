const express = require("express");
const router = express.Router();
const {
  createJournal,
  getAllJournals,
  getJournal,
  updateJournal,
  deleteJournal,
} = require("../controller/journals");

router.route("/").get(getAllJournals).post(createJournal);
router.route("/:id").get(getJournal).patch(updateJournal).delete(deleteJournal);

module.exports = router;
