import mongoose from 'mongoose';

mongoose.connect("mongodb+srv://benedmm6:mendez1997@cluster0.eash2.mongodb.net/iglesia?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(db => console.log('DB is connected'))
    .then(error => console.log(error))