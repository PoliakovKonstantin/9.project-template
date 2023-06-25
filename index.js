let express = require(`express`);
let app = express();
let port = 3005;
const UserModel = require("./src/models/user.model");


const OrderModel = require("./src/models/order.model");
const AutoModel = require("./src/models/auto.model");
let mongoose = require('mongoose');

 mongoose.connect('mongodb://user:qwerty@127.0.0.1:27017/db?authMechanism=DEFAULT');



// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));


// Настройка POST-запроса — JSON
app.use(express.json());
app.use(express.urlencoded());
app.post("/sign",async (req, res) => {
    login=req.body.email
    password=req.body.password
    await UserModel.findOne({email:login,password:password}).then(usr => {
    if(usr){
        res.redirect(301,"/orders?id="+usr.id+"")
        console.log(usr)
    }
    else{
        res.status(403).send("Forbidden")
    }})
})
app.post('/reg',async (req,res)=>{
    
    const user = new UserModel(); // create a new instance of the User model

       
    if(!await UserModel.findOne({email: req.body.email+123})){

        
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.fullName = req.body.firstName + " " + req.body.lastName;
        user.password = req.body.password;
        user.email = req.body.email;
        user.isAdmin = false;
        user.createdOn = new Date().toLocaleString(); 
            await user.save(user)
            res.send(user);
    }
   else{
    res.send("Такой пользователь уже существует")
   }
})
app.get('/orders',(req,res)=>{
    const order = new OrderModel();
    const auto=new AutoModel();
    let id=req.query.id;
     OrderModel.find({u_id:id}).then((orders)=>{
        res_array=[]
   orders.map( (el) => {
        AutoModel.findOne({_id:el.Auto_id}).then((auto1)=>{
            //console.log(auto1)
            el.name=auto1.name
        el.productImage=auto1.productImage
        res_array.push(el)
        console.log(res_array)
        })
        

        
    })
    
    })
        setTimeout(()=>{
            console.log(res_array)
            res.json(res_array)
        },125)
        
    
    
    
})
app.get("/cars",async(req,res)=>{
    res.send(await AutoModel.find())
})
// Настройка БД

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});
