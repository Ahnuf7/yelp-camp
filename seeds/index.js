const express = require(`express`);
const mongoose = require('mongoose');
const path = require(`path`);
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')


const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp',  { useNewUrlParser: true, useUnifiedTopology: true  })
    .then(() => {
        console.log("CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO ERROR!!!!")
        console.log(err)
    })
// const sample = array => array[Math.floor(Math.random()* array.lenght)];
const sample = (array) => {
    return array[Math.floor(Math.random() * array.length)];
  }


const seedDB = async () =>{
    await Campground.deleteMany({});
    for(let i = 0 ; i <300 ;i++){
        const random1000 = Math.floor(Math.random()*1000);
        const price = Math.floor(Math.random()*20) + 10;
        const camp = new Campground({
            author : '647fa77c3ef63b7e70d39972',
            location : `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description : `Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit corporis, blanditiis cum ex quos ratione odio voluptas ut quo ipsum magnam illum atque totam illo, nemo, iste molestiae iusto tempora.`,
            price,
            geometry : { 
              type: 'Point',
               coordinates: [
                cities[random1000].longitude,
                cities[random1000].latitude ]
               },
               images: [
                {
                  url: 'https://res.cloudinary.com/dvezwdumx/image/upload/v1692458051/YelpCamp/z5abp8pwtexvntlqbnre.jpg',
                  filename: 'YelpCamp/z5abp8pwtexvntlqbnre',                 
                },
                {
                  url: 'https://res.cloudinary.com/dvezwdumx/image/upload/v1692458068/YelpCamp/ktbvwuuzwscosfb1zdpb.jpg',
                  filename: 'YelpCamp/ktbvwuuzwscosfb1zdpb', 
                },
                {
                  url: 'https://res.cloudinary.com/dvezwdumx/image/upload/v1692458080/YelpCamp/dpi8i23etinkwtqwv1ch.jpg',
                  filename: 'YelpCamp/dpi8i23etinkwtqwv1ch',
                }
              ]

            // title :`${sample(descriptors)} ${sample(places)}`
        })
        await camp.save();     
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})