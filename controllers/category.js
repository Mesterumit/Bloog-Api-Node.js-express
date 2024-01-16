const Model = require('../models/Category')


// @URL   GET/api/posts
exports.list = async(req,res)=>{
    console.log(res.results)
    res.status(200).json(res.results)
}

// @URL   GET/api/posts/:id
exports.read = async(req,res)=>{

    const data = await Model.findById(req.params.id)

    res.status(200).json({
        succes:true,
        data
    })
}

// @URL  POST / api/post
exports.create = async(req,res)=>{

    const data = await Model.create(req.body)
    res.status(201).json({
        succes:true,
        data
    })
}

// @URL  PUT/api/posts/:id
exports.update = async(req,res)=>{

    const data = await Model.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    res.status(202).json({
        succes:true,
        data
    })
}


//  @URL  delete/api/categories/:id
exports.delete = async(req,res)=>{

    const user = await Model.findById(req.params.id)
    await user.deleteOne()
    res.status(204).json({
        succes:true,
        data:{}
    })
}

