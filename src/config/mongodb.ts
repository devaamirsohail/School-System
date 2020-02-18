import { connect } from "mongoose";
import { MONGO_URI } from "./constants";
class Mongo {
  public initMongo() {
    connect(MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
      .then(() => console.log("MongoDb Connected successfully.."))
      .catch(err => console.log(err));
  }
}
export default Mongo;
