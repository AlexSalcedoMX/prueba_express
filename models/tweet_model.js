import mongoose from 'mongoose';

const tweetSchema = new mongoose.Schema({
	tweetId : String,
	queryId : String,
	verb : String,
	busquedaId : String,
	body : String,
	link : String,
	postedTime : Date,
	usuario : { preferredUsername : String, verified : Boolean, followersCount : Number, statusesCount : Number, displayName : String, link : String, friendsCount : Number, image : String},
	aplicacion : String,
	locacion : Object,
	hashtags : [String],
	imagenes : [String],
	urls : [String],
	menciones : [String],
	interpretaciones : [String]
},{ collection: 'tweets' });

export default mongoose.model('Tweet',tweetSchema);