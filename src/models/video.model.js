import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const VideoSchema = new Schema({

    videoFile:{
        type: String, //cloudnary url
        required: true
    },
    thumbnail:{
     type: String, //cloudnary url
     required: true
    },
    title:{
        type: String, 
        required: true
       },
    discription:{
        type: String, 
        required: true
       },
    duration:{
        type: Number, //cloudnary url
        required: true
       },
       views:{
        type: Number, //cloudnary url
        default0
       },
       isPublished:{
        type: Boolean,
        default: true 
       },
       owner:{
        type: Schema.Types.ObjectId,
        ref: "User"   //reference means kaha se le 
       }

},
{
timeseries: true
}
)


VideoSchema.plugin(mongooseAggregatePaginate); // this is plugin for pagination

export const Video = mongoose.model("Video", VideoSchema);