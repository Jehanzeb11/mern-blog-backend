const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/post");
const catRouter = require("./routes/categories");
const multer = require("multer")
const cors = require("cors")
const path = require("path")

dotenv.config();

app.use(cors())
app.use(express.json())
app.use("/images",express.static(path.join(__dirname,"/images")))

app.use("/api/auth",authRouter)
app.use("/api/users",userRouter)
app.use("/api/posts",postRouter)
app.use("/api/categories",catRouter)

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,"images")
  },
  filename:(req,file,cb)=>{
cb(null,req.body.name)
  }
})

const upload = multer({storage:storage})

app.post("/api/upload",upload.single("file"),(req,res)=>{
res.status(200).json("file has been uploaded")
})


const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoDB Connected")
}).catch((err)=>{
console.log(err)
})


app.listen(PORT, () => {
  console.log(`server is running on PORT : ${PORT} `);
});
