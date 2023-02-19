const express = require('express');
const cors = require('cors');
const app = express();
require('./dbConnect');
const User = require('./models/User');
const Product = require('./models/Product');
const Wishlist = require('./models/Wishlist');
const jwt = require('jsonwebtoken');
const jwtKey = 'vivek';
app.use(express.json());
app.use(cors());



///////////////////////////////////////////////////////////////////////////////////////////////
app.post('/signup', async(req,res)=>{
    let user = new User(req.body);
    await user.save();
    user = user.toObject();
    delete user.password;

    jwt.sign({user},jwtKey,{expiresIn:'1h'},(err,token)=>{
        if(err){
            res.send({user:"Something went wrong"});
        }
        res.send({user,auth:token});
    })
    
})

app.post('/login',async(req,res)=>{
    let data =await User.findOne(req.body);
    if(data){
    data = data.toObject();
    delete data.password

    jwt.sign({data},jwtKey,{expiresIn:"1h"},(err,token)=>{
        if(err){
            res.send({data:"Something went wrong"});
        }
        res.send({data,auth:token})
    })
    }
    else{
        res.send(false)
    }
})

app.delete('/delete/:id',verifyToken,async(req,res)=>{
    let data = await User.deleteOne({_id:req.params.id});
    if(data.deletedCount>0){
    res.send(true);
    }else{
        res.send(false);
    }
})

app.get('/editInfo/:id',verifyToken,async(req,res)=>{
    let data = await User.findOne({_id:req.params.id});
    res.send(data);
})

app.put('/updateInfo/:id',verifyToken,async(req,res)=>{
    let data = await User.updateOne({_id:req.params.id},req.body);
     res.send(data);
})

//////////////////////////////////////////////////////////////////////////////////////////

app.post('/addproduct',verifyToken,async(req,res)=>{
    let data = new Product(req.body);
    await data.save();
    if(data){
    res.send(data);}
    else{
        res.send(false)
    }
})

app.get('/myproduct/:_id',verifyToken,async(req,res)=>{
    let data = await Product.find({userId:req.params._id});
    if(data){
    res.send(data)}
    else{
        res.send(false);
    }
})

app.delete('/deleteProducts/:id',verifyToken, async(req,res)=>{
    let data = await Product.deleteMany({userId:req.params.id});
    res.send(data)
})

app.delete('/deleteProduct/:id',verifyToken, async(req,res)=>{
    let data = await Product.deleteOne({_id:req.params.id});
    res.send(data)
})

app.get('/getProduct/:id',verifyToken,async(req,res)=>{
    let data = await Product.findOne({_id:req.params.id});
    res.send(data);
})

app.put('/updateProduct/:id',verifyToken,async(req,res)=>{
    let data = await Product.updateOne({_id:req.params.id},{
        name:req.body.name,
        category:req.body.category,
        company:req.body.company,
        price:req.body.price
    })

    res.send(data);
})

app.get('/products',verifyToken,async(req,res)=>{
    let data = await Product.find();
    if(data){
    res.send(data)}
    else{
        res.send(false);
    }

})


app.get('/searchProducts/:key/:userId',verifyToken,async(req,res)=>{
    let data = await Product.find({$or:[
                                        {name:{$regex: new RegExp(req.params.key,'i')}},
                                        {company:{$regex: new RegExp(req.params.key,'i')}},
                                        {category:{$regex: new RegExp(req.params.key,'i')}},
                                        {price:{$regex: new RegExp(req.params.key,'i')}}
                                       ],userId:{$ne:req.params.userId}
                                    });
    res.send(data)
})

app.get('/searchMyProducts/:key/:userId',verifyToken,async(req,res)=>{
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

app.post('/wishlist',verifyToken,async(req,res)=>{
    let data = new Wishlist(req.body);
    data.save();
    res.send(data);
})

app.delete('/wishlist',verifyToken,async(req,res)=>{
    let data =await Wishlist.deleteOne(req.body);
    res.send(data)
})

app.post('/wishlistCheck',verifyToken,async(req,res)=>{
    let data =await Wishlist.find(req.body);
    if(data)
    res.send(data)
    else
    res.send(false)
})

app.get('/searchWishlist/:key/:userId',verifyToken, async(req,res)=>{
    let data = await Wishlist.find({
        $or : [
            {name : { $regex : new RegExp(req.params.key,'i')}},
            {company : { $regex : new RegExp(req.params.key,'i')}},
            {category:{$regex: new RegExp(req.params.key,'i')}},
            {price:{$regex: new RegExp(req.params.key,'i')}}
           ],userId:req.params.userId
    });

    res.send(data)
})

app.delete(`/wishlists/:id`,verifyToken,async(req,res)=>{
    let data =await Wishlist.deleteMany({userId:req.params.id});
    res.send(data)
})

/////////////////////////////////////////////////////////////////////////

function verifyToken(req,res,next){
    let token = req.headers['authorization'];
    if(token){
        jwt.verify(token,jwtKey,(err,valid)=>{
            if(err){
                res.status(403).send("Enter a Valid header");
            }else{
                next();
            }
        })
    }
    else{
        res.status(404).send("Token Missing");
    }
}


app.listen(5000)



