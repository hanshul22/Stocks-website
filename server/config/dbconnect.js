const mongoose = require('mongoose');

const MONGO_URI = process.env.DATABASEURI

const ConnectToDB = async () => {
    // try {
    //     const conn = await mongoose.connect(MONGO_URI);
    //     console.log(`Connected to MongoDB`);
    // } catch (error) {
    //     console.error(`Error: ${error.message}`);
    // }

    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => console.log('MongoDB connected...'))
      .catch(err => console.error('MongoDB connection error:', err));
}



module.exports = ConnectToDB