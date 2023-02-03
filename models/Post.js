import {Schema,model} from "mongoose";

const postSchema = new Schema({
	price:{
        type:Schema.Types.Decimal128,
        required: true
    },
	date_added:{
        type:String,
        trim:true,
        require:true
    },
	cut_date_added:{
        type:String,
        trim:true,
        require:true
    },
	description:{
        type:String,
        require:true
    },
	donation:{
        type:Boolean,
        require:true
    },
	photo:{
        type:String
    },
	// udm:{
	// 	type:Schema.Types.ObjectId,
    //     ref:'Udm'
	//     name:string
	// },
	product:{
        type:Schema.Types.ObjectId,
        ref:'Product',
        require:true  
    },
	place:{
        type:Schema.Types.ObjectId,
        ref:'Place',
        require:true	
	},
    available:{
        type:Boolean,
        require:true
    },
    // is_promo:{
    //     type:Boolean,
    //     require:true
    // }
});

export const Post= model('Post',postSchema);