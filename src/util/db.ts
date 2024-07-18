import mongoose from "mongoose";



export const main =async () =>{
  await mongoose.connect('mongodb://127.0.0.1:27017/local').then((c:any) => console.log(`DB Connected to ${c.connection.host}`))
  .catch((e:any) => console.log(e));

}
 