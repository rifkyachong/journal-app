const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../error");
const Journal = require("../model/Journal");

createJournal = async (req, res) => {
  const journal = await Journal.create({
    createdBy: req.user.userId,
    ...req.body,
  });
  res.status(StatusCodes.CREATED).json(journal);
};

getAllJournals = async (req, res) => {
  const journals = await Journal.find({ createdBy: req.user.userId });
  res.status(StatusCodes.OK).json(journals);
};

getJournal = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;

  const journal = await Journal.findOne({ createdBy: userId, _id: journalId });
  if (!journal) {
    return next(new NotFoundError(`no journal with id:${journalId}`));
  }

  res.status(StatusCodes.OK).json(journal);
};

updateJournal = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;

  const journal = await Journal.findOneAndUpdate(
    { createdBy: userId, _id: journalId },
    req.body,
    { new: true, runValidators: true }
  );

  if (!journal) {
    return next(new NotFoundError(`no journal with id:${id}, no update occur`));
  }

  res.status(StatusCodes.OK).json(journal);
};

deleteJournal = async (req, res, next) => {
  const {
    user: { userId },
    params: { id: journalId },
  } = req;

  const journal = await Journal.findOneAndDelete({
    createdBy: userId,
    _id: journalId,
  });

  if (!journal) {
    return next(new NotFoundError(`no journal with id:${id}`));
  }

  res.status(StatusCodes.OK).send();
};

module.exports = {
  createJournal,
  getAllJournals,
  getJournal,
  updateJournal,
  deleteJournal,
};
