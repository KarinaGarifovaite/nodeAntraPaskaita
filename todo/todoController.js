const ToDo = require("./todoModel");

getAllItems = (req, res) => {
  ToDo.find({
    user: req.user._id
  }, (items, error) => {
    if (error) return res.json(error);
    res.json(items);
  });
};

saveTodoItem = async (req, res) => {
  let body = req.body

  let todo = new ToDo({
    label: body.label,
    user: req.user._id
  })

  try {
    let savedItem = await todo.save()
    res.json(savedItem)
  } catch (e) {
    res.status(400).json(e)
  }
};

deleteObj = async (req, res) => {
  await ToDo.deleteOne({
    _id: req.params.id
  }, function (err) {
    if (err) return res.json(err);
    res.json("succes");
  });

};

updateStatus = async (req, res) => {
  try {
    let updated = await ToDo.findOneAndUpdate({
      _id: req.params.id,
      user: req.user._id
    }, req.body);
    res.json(updated)
  } catch (e) {
    res.status(400).json(e)
  }
};

module.exports = {
  getAllItems,
  saveTodoItem,
  deleteObj,
  updateStatus,
};