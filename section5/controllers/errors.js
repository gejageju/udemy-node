exports.error404= (req,res,next)=>{
    res.status(404).render('error404',{docTitle : 'Page Not Found' , path : ''});
};