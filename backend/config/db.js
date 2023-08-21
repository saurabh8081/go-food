const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://saurabhyadauvanshi59:goFood123@cluster0.zdgythg.mongodb.net/goFood?retryWrites=true&w=majority';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');

        const fetchedData = await mongoose.connection.db.collection('food_items').find().toArray();
        if (fetchedData.length === 0) {
            console.log('No data found in the collection.');
        } else {
            // console.log(fetchedData);
        }
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
    }
};

module.exports = connectToMongoDB;
