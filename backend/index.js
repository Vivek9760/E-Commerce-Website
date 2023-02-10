const express = require('express');
const cors = require('cors');
const app = express();
require('./dbConnect');
const User = require('./models/User');
const Product = require('./models/Product');
const Wishlist = require('./models/Wishlist');
app.use(express.json());
app.use(cors());



///////////////////////////////////////////////////////////////////////////////////////////////
app.post('/signup', async(req,res)=>{
    let user = new User(req.body);
    await user.save();
    user = user.toObject();
    delete user.password
    res.send(user);
})

app.post('/login',async(req,res)=>{
    let data =await User.findOne(req.body);
    if(data){
    data = data.toObject();
    delete data.password
    res.send(data);}
    else{
        res.send(false)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    let data = await User.deleteOne({_id:req.params.id});
    if(data.deletedCount>0){
    res.send(true);
    }else{
        res.send(false);
    }
})

//////////////////////////////////////////////////////////////////////////////////////////

app.post('/addproduct',async(req,res)=>{
    let data = new Product(req.body);
    await data.save();
    if(data){
    res.send(data);}
    else{
        res.send(false)
    }
})

app.get('/myproduct/:_id',async(req,res)=>{
    let data = await Product.find({userId:req.params._id});
    if(data){
    res.send(data)}
    else{
        res.send(false);
    }
})

app.delete('/deleteProducts/:id', async(req,res)=>{
    let data = await Product.deleteMany({userId:req.params.id});
    res.send(data)
})

app.delete('/deleteProduct/:id', async(req,res)=>{
    let data = await Product.deleteOne({_id:req.params.id});
    res.send(data)
})

app.get('/getProduct/:id',async(req,res)=>{
    let data = await Product.findOne({_id:req.params.id});
    res.send(data);
})

app.put('/updateProduct/:id',async(req,res)=>{
    let data = await Product.updateOne({_id:req.params.id},{
        name:req.body.name,
        category:req.body.category,
        company:req.body.company,
        price:req.body.price
    })

    res.send(data);
})

app.get('/products',async(req,res)=>{
    let data = await Product.find();
    if(data){
    res.send(data)}
    else{
        res.send(false);
    }

})


app.get('/searchProducts/:key/:userId',async(req,res)=>{
    let data = await Product.find({$or:[
                                        {name:{$regex: new RegExp(req.params.key,'i')}},
                                        {company:{$regex: new RegExp(req.params.key,'i')}},
                                        {category:{$regex: new RegExp(req.params.key,'i')}},
                                        {price:{$regex: new RegExp(req.params.key,'i')}}
                                       ],userId:{$ne:req.params.userId}
                                    });
    res.send(data)
})

app.get('/searchMyProducts/:key/:userId',async(req,res)=>{
    let data = await Product.find({$or:[
                                        {name:{$regex: new RegExp(req.params.key,'i')}},
                                        {company:{$regex: new RegExp(req.params.key,'i')}},
                                        {category:{$regex: new RegExp(req.params.key,'i')}},
                                        {price:{$regex: new RegExp(req.params.key,'i')}}
                                       ],userId:req.params.userId
                                    });
    res.send(data)
})
/////////////////////////////////////////////////////////////////////////////////////

app.post('/wishlist',async(req,res)=>{
    let data = new Wishlist(req.body);
    data.save();
    res.send(data);
})

app.delete('/wishlist',async(req,res)=>{
    let data =await Wishlist.deleteOne(req.body);
    res.send(data)
})

app.post('/wishlistCheck',async(req,res)=>{
    let data =await Wishlist.find(req.body);
    if(data)
    res.send(data)
    else
    res.send(false)
})

app.listen(5000)



