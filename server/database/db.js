const mongoose = require('mongoose');
const uri ="mongodb+srv://saurabhkumar:rVKACHYbuzYy7VMs@cluster0.n4zogin.mongodb.net/mernstacktodo?retryWrites=true&w=majority";

const db = async () => {
    try {
        mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to mongodb");
        
    } catch(error ){
        console.log(error);
    }
}

module.exports = db;