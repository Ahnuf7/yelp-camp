const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;
// https://res.cloudinary.com/demo/image/upload/ar_1.0,c_lfill,h_200/docs/models.jpg
const ImageSchema  = new Schema({
    url : String,
    filename : String
})
// ImageSchema.virtual('thumbnail').get(function () {
//     return this.url.replace("/upload", "/upload/ar_1.0,c_fill,g_north_west,w_250")  
// })
const opts = {toJSON: {virtuals : true} };
const CampgroundSchema = new Schema({
    title : String,
    price : Number,
    images : [ImageSchema],
    geometry :{
        type : {
            type : String,
            enum : ['Point'],
            required: true
        },
        coordinates : {
            type :[Number],
            required : true
        }

    },
    
    description : String, 
    location : String,
    author : {
        type : Schema.Types.ObjectId,
        ref : 'User'
    },
    reviews : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Review'
        }
    ]

}, opts);
CampgroundSchema.virtual('properties.popUpMarkup').get(function (){
    return `
    <strong><a href="/campgrounds/${this._id}">${this.title}</a></strong>
    <p>${this.description.substring(0,20)}...</p>`
})
CampgroundSchema.post('findOneAndDelete', async function(doc){
    if(doc){
        await Review.deleteMany({
            _id :{
                $in : doc.reviews
            }
        })
    }
    console.log(doc);
})
module.exports = mongoose.model('Campground',CampgroundSchema);

