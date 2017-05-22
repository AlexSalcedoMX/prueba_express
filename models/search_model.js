import mongoose from 'mongoose';

const searchSchema = new mongoose.Schema({
	identificador: String,
	descripcion: String,
	inicio : Date,
	termino : Date,
	trabajo : String,
	canal : String,
	end_type: String,
	limit_value: Number,
	limit: Boolean,
	interpretes: [mongoose.Schema.Types.ObjectId],
	querys : mongoose.Schema.Types.ObjectId,
	tags : mongoose.Schema.Types.ObjectId,
	estado : String,
	tipo : String,
	fuente : String,
	created : Date,
	__v : Number,
	account_id : Number,
	owner_id : Number
},{ collection: 'busquedas' });

export default mongoose.model('Search',searchSchema);