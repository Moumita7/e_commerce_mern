
const Category = require("../models/category")


exports.getCategoryById=(req,res,next,id)=>{
    Category.findById(id).exec((err,cate)=>{
        if(err){
            return res.status(400).json({
                error:"Category not found in DB"
            })
        }
        req.category=cate;
        next()
    })
 
}

exports.createCategory=(req,res)=>{
const category=new Category(req.body);
category.save((err,category)=>{
    if(err){
        return res.status(400).json({
            error:"Category not found in DB"
        })
    }
    res.json({category})

})
}

exports.getCategory=(req,res)=>{
    return res.json(req.category)

}

exports.getAllCategory=(req,res)=>{
    Category.find().exec((err,category)=>{
        if(err){
            return res.status(400).json({
                error:"Categorise found"
            })
        }
        res.json(category)
    })

}

exports.updateCategory=(req,res)=>{
    const category=req.category
    category.name=req.body.name;
    category.save((err,updatecate)=>{
        if(err){
            return res.status(400).json({
                error:"faild to update category"
            })
        }
        res.json(updatecate)
    })
}

exports.removeCategory=(req,res)=>{
    const category=req.category; //its comeing from middleware
    category.remove((err,category)=>{

        if(err){
            return res.status(400).json({
                error:"faild to delete this category"
            })
        }
        res.json({
            message:`${category.name} Succfully deleted`
        })
    })
}