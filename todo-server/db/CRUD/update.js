const model=require("../model");
function update(ids,isDone){
    return model.updateMany({_id:{$in:ids}},{$set:{isDone}});
}
module.exports.update=update;