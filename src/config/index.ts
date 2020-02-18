import Mongo from "./mongodb";

class Config {
  private mongo = new Mongo();
  public loadConfiguration(): void {
    this.mongo.initMongo();
  }
}

export default Config;
