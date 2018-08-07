const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/Admin/adminUser');
const adminAuthRoutes = require('./routes/Admin/auth');
module.exports  = (app) => {
    app.get('/',(req,res)=>{
        res.status(200).json('MMA - API');
    });
    app.use('/users',userRoutes);
    app.use('/auth',authRoutes);
    app.use('/admin',adminRoutes);
    app.use('/admin/auth',adminAuthRoutes);
    app.get('/*',(req,res) => {
        res.status(404).json('Resource Not Found !!!');
    });
}