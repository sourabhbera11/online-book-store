const mongoose=require("mongoose");
const express= require("express");
const cors=require("cors")
const dotenv = require("dotenv");
const paymentRoutes = require("./routes/payment");
dotenv.config()
const bodyParser=require("body-parser")
const app=express()
app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.use("/api/payment",paymentRoutes);

const DB = 'mongodb+srv://sourabh:sourabh@cluster0.gxyzgvj.mongodb.net/bookstore?retryWrites=true&w=majority'


mongoose.connect(DB,{
  useNewUrlParser:true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
}).then(()=> {
  console.log('CONNECTION SUCCESSFUL');
}).catch((err) => console.log(err));

  const UserSchema= new mongoose.Schema({
    name:String,
    surname:String,
    password:String,
    age:Number,
    email:String,
    password:String,
    phone:Number,
    location:String,
    status:Boolean
  });

  
  const AdminSchema = new  mongoose.Schema({
    name:String,
    email:String,
    password:String

  });

  const Bookchema= new mongoose.Schema({
    isbn:Number,
    bookname:String,
    bookauthor:String, 
    bookimage:String,
    price:String,
    offer:String,
  })

  const CartSchema =new mongoose.Schema({
    isbn:Number,
    bookname:String,
    bookimage:String,
    price:String,
    quantity:Number,
    bookauthor:String


  })

  const OrderSchema =new mongoose.Schema({
    isbn:Number,
    bookname:String,
    price:String,
    quantity:Number,
    name:String,
    location:String,
    phone:Number,
    email:String
  })

  const user=mongoose.model("user",UserSchema,"users");

  const admin=mongoose.model("admin",AdminSchema,"admin");
 
  const book=mongoose.model("book",Bookchema,"book");

  const cart =mongoose.model("cart",CartSchema,"cart");

  const order=mongoose.model("order",OrderSchema,"order");



app.get("/book",(req,res)=>
{
  let arr=[];
  book.find((err,attribute)=>
  {  
     if(err)
     console.log(err);
     else
     {
  
      attribute.forEach((names)=>
      {
        arr.push(names);
        
      });
      console.log("here");
       res.send(arr);
      console.log("done");

     }
    
  });
})

app.post("/login",(req,res)=>
{  
  // console.log(req.body);
  let a=req.body

  user.findOne({email:req.body.email},(err,adi)=>
  {  
    try{
      console.log(adi)
      console.log(req.body)
      if(!err)
      {
       if(req.body.password==adi.password)
       {
         console.log("successfully login")

          user.updateOne({email:req.body.email},{status:true},(err)=>
         {
              if(err)
           console.log(err);
            else{
              console.log("status true");
              res.send("op")
              }
            }
)
       }
       else
        console.log("Incorrect details");
     }
    }
  catch(error)
  {
    console.log("Pls Create a account")
  }
    
  })

});


app.get("/",(req,res)=>
{
  console.log("worked fine")
  res.send("hellllllo");
 
})

app.post("/admin",(req,res)=>
{
  let input=req.body.password;
  console.log(input)
  
  admin.findOne({email:req.body.email},(err,adi2)=>
  { 
      try
      {
        console.log(adi2);
        if(!err)
        {
          if(req.body.password==adi2.password)
          {
             console.log("you are an admin");
              res.send("success");
          }
          else{
             console.log("email or password incorrect");
          }
        }
      }
        catch(err)
        {
          console.log(err);
         console.log("you are not a admin");
        }
      }
  )
});


app.post("/signup",(req,res)=>
{
 let input=req.body;
 console.log(input);


 user.findOne({email:req.body.email},(err,adi)=>
  {  
    try{
       console.log(adi)
      if(!err)
      {
       if(req.body.password==adi.password && req.body.name==adi.name)
       {
         console.log("account already exists")
         res.send("success")

       }
       else
        console.log("Incorrect details");
     }
    }
  catch(error)
  {
    console.log("Creating new accoun")
    const abc=new user({
      name:input.name,
      surname:input.surname,
      password:input.surname,
      email:input.email,
      age:input.age,
      password:input.password,
      phone:input.phone,
      location:input.location,
      status:false
    });
    console.log("account created successfully");
    res.send("success")
    abc.save()
  }
  })
})

app.post("/addbook",(req,res)=>
{
   let data=req.body;
   console.log(data.bookauthor);
    let obj=
    {   
      isbn:data.isbn,
      bookname:data.bookname,
      bookauthor:" "+data.bookauthor,
      bookimage:data.bookimage,
      price:"Rs "+data.price,
      offer:data.offer+"%"
      // isbn:isbnno,
      //  bookname:bookname,
      //  bookauthor:authorname,
      //  bookimage:bookimage,
      //  price:bookprice,
      //  offer:bookoffer

    }
      book.create(obj,(err)=>
      {
        if(err)
      {
      console.log(err);
     }
     else{
      res.send("success");
      console.log("achieved");
     }
      });
});


app.get("/product",(req,res)=>
{
  console.log("heyyyyyy");
  let arr=[];
  book.find((err,attribute)=>
  {  
     if(err)
     console.log(err);
     else
     {
  
      attribute.forEach((names)=>
      {
  
        arr.push(names);


        
      });
      console.log("here");
       res.send(arr);
       console.log(arr)
      console.log("soueabh");

     }
    
  });
})

app.post("/cart",(req,res)=>
{
  console.log("butttttttttttttttttttttttttttttttttttttttttttttttttttttt")
  let found=false;
  let x=req.body;
  let result=0;
  console.log("cart item here");
  console.log(x);
  console.log(x.length);
  console.log(Object.keys(x).length)

 cart.find({isbn:x.isbn},(err,attribute)=>
 {
  console.log("hey");
  if(!err)
  {
    attribute.forEach((data)=>
    {
      if(data.isbn==x.isbn)
      { 
        found=true;
        // console.log(found);
      }
    })
   
  }
  if(found==true)
 {
   console.log("item is already present");
    res.send("present")
 }

 else
 {
  const abc= new cart({
    isbn:x.isbn,
    bookname:x.bookname,
    bookimage:x.bookimage,
    price:x.price,
    quantity:1,
    bookauthor:x.bookauthor
  })
  abc.save();
  console.log("data entered success");
  res.send("not present")
 }
 

  //  console.log("this is found",found);
 })
})

//  if(Object.keys(x).length == 0) 
//  {
//    console.log("it is 0 length")
//  }
 

 
//
 
 app.get("/cart",(req,res)=>
 {
  console.log("it is working");
  console.log("in cart page")
  let arr=[];
  cart.find((err,attribute)=>
  {  
     if(err)
     console.log(err);
     else
     {
      attribute.forEach((names)=>
      {
        arr.push(names);
      });
      console.log("this is cart get");
       res.send(arr);

     }
    
  });
 })
//})

app.post("/delbook",(req,res)=>
{  
  console.log("this is delete")
  let data=req.body;
   console.log(data);
   cart.deleteMany({bookname:data.bookname},(err)=>
   {
    if(err){
      console.log(err);
    }
    else
    {
      console.log("deleted from cart");
      res.send("success");
    }
   })
})

app.post("/inc",(req,res)=>
{
  console.log("in inc post");
  
  let data=req.body;
  console.log(data);
  console.log(typeof(data.isbn))
  cart.updateOne({isbn:data.isbn},{quantity:data.quantity},(err)=>
  {
    if(err)
    console.log(err);
    else{
      console.log("opppp you did it");
      res.send(data.isbn+"");
    }
  }
  
)
}
);

app.post("/plus",(req,res)=>
{ 
    let a=req.body;
    console.log(a);
    cart.findOne({isbn:a.isbn},(err,data)=>
    {
      if(err)
      {
        console.log(err);
      }
      else{
        console.log("aditya");
        console.log(data.quantity);
       res.send(data.quantity+"");
      }
    })

})


app.post("/payme",(req,res)=>
{
  let data=req.body;
   console.log(data);
   let arr=[];
   book.findOne({isbn:data.isbn},(err,data)=>
   {
    if(err)
    {
   console.log(err);
    }
    else{
      console.log("our product")
      console.log(data)
      arr.push(data)
      res.send(arr);
    }
   });
 
})

app.post("/invoice",(req,res)=>
{
   console.log("asdffffffffffffffffffffffffffff");
   console.log(req.body);
   let name="";
   let email="";
   let location="";
   let phone="";
  let x=[]
  let a=0;
    user.find((err,attribute)=>
    {  
       if(err)
       console.log(err);
       else
       {
        x=attribute;
       }
       x.forEach((item)=>
       {
        if(item.status==true)
        {
          name=item.name;
          email=item.email;
          location=item.location;
          phone=item.phone
        }
        
        console.log("zzzzzzzzzz");
   console.log(location,name);
  
    let obj=
    {
      isbn:req.body.isbn,
    bookname:req.body.bookname,
    price:req.body.price,
    quantity:req.body.quantity,
    location:location,
    phone:phone,
    email:email,
    name:name,

    }

    order.create(obj,(err)=>
      {
        if(err)
      {
      console.log(err);
     }
     else{
      res.send("success");
      console.log("achieved");
     }
       })
    })
    
      });
})

app.get("/invoice",(req,res)=>
{ 
  let name="";
  let isbn="";
  let bookname="";
  let location="";
  let email="";
  let phone="";
  let price="";
  let quantity=1;
let arr=[];
  order.find((err,attribute)=>
  {
    if(err)
    {

    }
    else
    {
      attribute.forEach((data)=>
      {
        isbn=data.isbn;
        name=data.name;
        bookname=data.bookname;
        location=data.location;
        email=data.email;
        phone=data.phone;
        price=data.price;

      })
    }
    console.log(isbn,name,bookname,location,email,phone,price);
    let obj=
    {
      isbn:isbn,
      name:name,
      bookname:bookname,
      location:location,
      email:email,
      phone:phone,
      price:price,
      quantity:quantity
    }
    arr.push(obj)
  
    res.send(arr);
    console.log(obj);
  })
})

app.listen(9002,(req,res)=>
{
    console.log("port is listenin");
})

  
