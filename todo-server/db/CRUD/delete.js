const model = require("../model");

function deleteItem(ids) {
    return model.deleteMany({
        _id: {
            $in: ids
        }
    });
}
module.exports.deleteItem=deleteItem;