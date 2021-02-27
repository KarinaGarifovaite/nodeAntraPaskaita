const PersonalInfo = require("./info-model");

getAllItems = (req, res) => {
    PersonalInfo.find({}, (items, error) => {
        if (error) return res.json(error);
        res.json(items);
    });
};

savePersonalInfo = async (req, res) => {
    let {
        email,
        adress,
        streetNumber
    } = req.body;


    let info = new PersonalInfo({
        email: email,
        adress: adress,
        streetNumber: streetNumber,

    });

    try {
        let savedItem = await info.save();
        res.json(savedItem);
    } catch (e) {
        res.status(404).json(e);
    }

};

deleteObj = async (req, res) => {

    let musuID = req.body._id;

    try {
        let idExist = await PersonalInfo.findById(musuID);
        if (idExist === null) throw "toks id jau istrintas"
        let deletedItem = await PersonalInfo.deleteOne({
            _id: musuID
        });
        res.json(deletedItem);
    } catch (err) {
        res.status(404).json(err);
    }
};



updatePersonalInfo = async (req, res) => {
    try {
        let updatedItem = await PersonalInfo.findByIdAndUpdate(req.body._id, req.body);
        res.json(updatedItem);
    } catch (err) {
        res.status(404).json(err);
    }
};

module.exports = {
    getAllItems,
    savePersonalInfo,
    deleteObj,
    updatePersonalInfo
};