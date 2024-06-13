const errorHandler = (err,req,res,next) => {
    switch(err.name){
        case "SequelizeValidationError":
        case "SequelizeUniqueConstraintError":
            res.status(400).json({message: err.errors[0].message})
            return
        case "File Required":
            res.status(400).json({message: err.message})
        case "Email Empty":
            res.status(401).json({message: "Email cannot be empty"})
            return 
        case "Password Empty":
             res.status(401).json({message: "Password cannot be empty"})
            return
        case "Invalid Login":
            res.status(401).json({message: "Email or Password invalid"})
            return
        case "Invalid Token":
            res.status(401).json({message: "Invalid Token"})
            return
        case "Unauthorized":
        case "JsonWebTokenError":
            res.status(401).json({message: "Invalid Token"})
            return 
        case "Forbidden":
            res.status(403).json({message: "Forbidden Access"})
            return
        case "Not Found":
            res.status(404).json({message: "Data Not Found"})
            return
            default:
            // console.log(err.name);
            res.status(500).json({message: "Internal server error"})
            return
    }
}

module.exports = errorHandler