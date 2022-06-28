const {User} = require("../models/User")
var crypto = require("crypto")
 
exports.ShowUsers = function(req,res){
    User.findAll()
    .then(data=>{
        res.json(data)
    })
    .catch(err => {
        res.status(500).json({ message: err.message })
    })
}
exports.AddUser = function(req,res){
    let username = req.body.username
    let password = req.body.password
    hashedPassword = crypto.createHash("sha256").update(password).digest('hex')
    User.create({username:username,hashedPassword:hashedPassword})
    .then(data=>{
        res.status(200).json(data)
    })
}
exports.Authenticate = function(req,res){
    let username = req.body.username
    let hashedPassword = req.body.hashedPassword
    User.findOne(
        {where:{username:username,hashedPassword:hashedPassword},
        attributes : ["username"]
        }
    )
    .then(data=>{
        if(data){
            res.status(200).json(data)
        }else{
            res.status(500).json({err:"not found"})
        }
    })
    .catch(err=>{
        res.status(500).json({err:err.message})
    })
}
