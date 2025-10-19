import mongoose, { mongo } from "mongoose";

const seoSchema = mongoose.Schema(
    {
        seo_id : {type: mongoose.Types.ObjectId, ref:"admin"},
        page_title: {type: String, required: true},
        meta_description: {type: String, required: true},
        keywords: [{type: String}],
        content: {type: String}   
    },
       {timestamps: true}
)

const seoModel = mongoose.model("seoModel", seoSchema)

export default seoModel
