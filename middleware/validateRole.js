const authRole = (allowedRoles=[])=>{
    return(req,res,next)=>{
        if(allowedRoles.includes(req.role)|| allowedRoles.includes("*")){
            return next();           
        }
        return res.status(403).json({message:"Access Denied"})
    }
}

module.exports = authRole;