const router =require("express").Router();
const Razorpay = require("razorpay");
const crypto= require("crypto");


router.post("/orders",async(req,res)=>
{
    try{
        const instance = new Razorpay({
            key_id:process.env.key_id,
            key_secret:process.env.key_secret,
        });

     const options =
     {
        amount:req.body.amount*100,
        currency:"INR",
         receipt:crypto.randomBytes(10).toString("hex")

     };
     instance.orders.create(options,(error,order)=>
     {
     if(error)
     {
        console.log(error);
        return res.status(500).json({message:"Something went wrong"})
     }
     res.status(200).json({data:order});
     });
    }
    catch(error)
    {
      console.log(error);
      res.status(500).json({message:"Internal server Error"});
    }
})


 router.post("/verify",async(req,res)=>
 {
    try{
      const{
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature
      }=req.body;
      
      const sign= razorpay_order_id+ "|"+ razorpay_payment_id;

      const expectedSign =crypto
      .createHmac("sha256",process.env.key_secret)
      .update(sign.toString())
      .digest("hex")

      if(razorpay_signature === expectedSign)
      {
        return res.status(200).json({message:"success"})
      }
      else{
         return res.status(400).json({message:"Inavlid signature sent!"})
      }
      
    }
    catch(error)
    {
        console.log(error);
        res.status(500).json({message:"Internal server error"})
    }
 })
module.exports= router;