//this is a main file where server runs 
import connectDB from './db/indexdb.js';
import dotenv from "dotenv"; 
import { app } from './app.js';
// const app = express()

dotenv.config({
    path: "./.env",
  });


connectDB() // piche express kam karega
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log("Mongo db connection failed!!!", err);
  });


app.get('/', function (req, res) {
  res.send('Hello World')
})

app.listen(3000)
console.log('listening on port 3000')