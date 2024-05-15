import mongoose from "mongoose";


const ProductSchema  = new mongoose.Schema({
    prod_name: {
        type:String,
        require:true
    },
    prod_desc:  {
        type:String,
        require:true
    },
    prod_price:  {
        type:Number,
        require:true
    },
    update_at: { type: Date, default: Date.now },
});
export default mongoose.model("Product", ProductSchema) ;