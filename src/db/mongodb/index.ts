import mongoose from "mongoose";

mongoose.connect(
  `mongodb://localhost/test`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log(err);
  }
);
mongoose.connection
  .once("open", async function () {
    console.log("Connection successful");
  })
  .on("error", function (error: any) {
    console.log("Connection failed", error);
  })
  .on("disconnected", function () {
    console.log("Disconnected");
  });

export default mongoose;
