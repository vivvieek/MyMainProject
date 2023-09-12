const mongoose = require('mongoose');
//MongoDB Atlas connect
mongoose.connect('mongodb+srv://officialsabarinarayan:9447103050@cluster0.buyzcu4.mongodb.net/finalproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
    })
.catch(err => console.error('Error connecting to MongoDB Atlas:', err));