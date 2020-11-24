//Chokri1994:password
// IPadress:102.170.75.14 :my ip address
//mongodb+srv://chokrihamza:<password>@cluster0.nicld.mongodb.net/<dbname>?retryWrites=true&w=majority
//****************************Connect TO mongo Atlas******************************************
function connectDB() {
      require('dotenv/config');
      const mongoose = require('mongoose');
      // Connecting to the database 
      mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
      });

      mongoose.connection.on('connected', () => {
            console.log('mongodb connected successfully');
      })
}

module.exports = connectDB
//****************************END Connect TO mongo Atlas******************************************