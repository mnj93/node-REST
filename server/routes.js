const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const userJobRoutes = require('./routes/jobs');
const adminRoutes = require('./routes/Admin/adminUser');
const adminAuthRoutes = require('./routes/Admin/auth');
const adminJobsRoutes = require('./routes/Admin/jobs');
module.exports  = (app) => {
    app.get('/',(req,res)=>{
        res.status(200).json('MMA - API');
    });
    app.use('/users',userRoutes);    
    app.use('/auth',authRoutes);
    app.use('/jobs',userJobRoutes);
    app.use('/admin',adminRoutes);
    app.use('/admin/auth',adminAuthRoutes);
    app.use('/admin/jobs',adminJobsRoutes);
    app.get('/*',(req,res) => {
        res.status(404).json('Resource Not Found !!!');
    });
}