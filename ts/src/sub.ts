import * as mongoose from "mongoose";
var Cat =  new mongoose.Schema({ name: String });
var User = mongoose.model("Bat", Cat);


var rat = mongoose.model("rat", Cat);
export type rat = {
	name:string;
}

export default User;
