const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
   for(let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp =  new Campground({
        author: '65b13e1101f28329d9b2d782',
        location: `${cities[random1000].city}, ${cities[random1000].state}`,
        title: `${sample(descriptors)} ${sample(places)}`,
        description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iure reiciendis sunt explicabo nobis, accusantium omnis a temporibus vitae aspernatur ex perferendis maiores culpa nihil nulla! Aspernatur sapiente dolor quasi labore.',
        price,
        geometry: {
            type: "Point",
            coordinates: [-113.1331, 47.0202]
        },
        images: [
                    {
                      url: 'https://res.cloudinary.com/dhpr9zkkc/image/upload/v1707840621/YelpCamp/h2fesrjqqtznzf8giypl.jpg',
                      filename: 'YelpCamp/h2fesrjqqtznzf8giypl',
                    },
                    {
                      url: 'https://res.cloudinary.com/dhpr9zkkc/image/upload/v1709053434/YelpCamp/movtm9zvc4xcxub6gjjg.png',
                      filename: 'YelpCamp/movtm9zvc4xcxub6gjjg',                
                    },
                    {
                      url: 'https://res.cloudinary.com/dhpr9zkkc/image/upload/v1707840623/YelpCamp/n766mpdngyqbadcgc7ci.png',
                      filename: 'YelpCamp/n766mpdngyqbadcgc7ci',
                    }
                  ]
            
    })
    await camp.save()
   }
}

seedDB().then(() => {
    mongoose.connection.close();
})