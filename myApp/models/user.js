const bcrypt = require('bcrypt-nodejs')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username : {
        type: String,
        required : true
    },
    password : {
        type : Date,
        required : true
    }
});

/*userSchema.methods.hashPassword= (Password )=>{
    return bcrypt.hashSync(Password,bcrypt.genSaltSync(10))
}
userSchema.methods.comparePasswords = (Password , hash) =>
{
    return bcrypt.compareSync(Password , hash)
}*/
const User = mongoose.model('User',userSchema)
module.exports = User