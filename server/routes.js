const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
module.exports  = (app) => {
    app.get('/',(req,res)=>{
        res.status(200).json('MMA - API');
    });
    app.use('/users',userRoutes);
    app.use('/auth',authRoutes);
    app.get('/*',(req,res) => {
        res.status(404).json('Resource Not Found !!!');
    });
}