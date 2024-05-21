import mongoose from "mongoose";


const ProductSchema  = new mongoose.Schema({
    
    img_url: {
        type:String,
        default: "none"
    },
    album_name: {
        type:String,
        require:true
    },
    album_desc:  {
        type:String,
        require:true
    },
    year_released:  {
        type:String,
        require:true
    },
    album_price:{
        type: Number,
        require:true
    }
    ,
    update_at: { type: Date, default: Date.now },
});
export default mongoose.model("Product", ProductSchema) ;