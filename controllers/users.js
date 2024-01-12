const Model = require('../models/User')


// @URL   GET/api/users
exports.list = async(req,res)=>{
    const data = await Model.find()

    res.status(200).json({
        succes: true,
        data
    })
}

// @URL   GET/api/users/:id
exports.read = async(req,res)=>{

    const data = await Model.findById(req.params.id)

    res.status(200).json({
        succes:true,
        data
    })
}

// @URL  POST / api/users/:id
exports.create = async(req,res)=>{

    const data = await Model.create(req.body)
    res.status(201).json({
        succes:true,
        data
    })
}

// @URL  PUT/api/users/:id
exports.update = async(req,res)=>{

    const data = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(202).json({
        succes:truw,
        data
    })
}


//  @URL  delete/api/users/:id
exports.delete = async(req,res)=>{

    const user = await Model.findById(req.params.id)
    await user.deleteOne()
    res.status(204).json({
        succes:true,
        data:{}
    })
}

