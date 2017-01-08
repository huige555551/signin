var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	username  : String,
	studentId : String,
	password  : String,
	telephone : String,
	email     : String
});

userSchema.methods.checkUser = function(cb) {

	return User.findOne({ $or:[ {'username':this.username}, {'studentId':this.studentId},
		{'telephone':this.telephone},{"email":this.email} ]},cb).exex();
};
userSchema.methods.checkUserValid = function(username,password){
	return User.findOne({ "username": username,'password':password}).exec().then(function(user){
        if(user)
            return Promise.resolve(user);
        else{
            var error = "提示：错误的用户名或者密码";
            return Promise.reject(error);
        }

	});
};
var User = mongoose.model("User",userSchema);

module.exports = User;


