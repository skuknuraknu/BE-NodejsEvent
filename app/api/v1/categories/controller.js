const Categories = require('./model')
const { getAllCategories, createCategories } = require('../../../services/mongoose/categories')

const create = async (req, res, next) => {
    try {
        const result = await createCategories( req )
        res.status(201).json({
            data: result
        })
    } catch ( error ) {
        next( error )
    }
}

const index = async( req, res, next ) => {
    try {
        const result = await getAllCategories( res )
        res.status(200).json({ 
            data: result
        })
    } catch ( error ) {
        next( error )
    }
}

const find = async( req, res, next ) => {
    try {
        const result = await getOneCategories( req )
        if ( !result ) {
            return res.status(404).json({ 
                message: "Category not found"
            })
        }
        res.status(200).json({ 
            data: result
        })
    } catch ( error ) {
        next( error )
    }
}

const update = async( req, res, next ) => {
    try {
        const { id } = req.params
        const checkCategory = await Categories.findOne({ _id: id })
        if ( !checkCategory ) {
            return res.status(404).json({ 
                message: "Category not found"
            })
        }
        checkCategory.name = req.body.name
        await checkCategory.save()
        res.status(200).json({ 
            data: checkCategory
        })
    } catch ( error ) {
        next( error )
    }
}

module.exports = {
    create,
    index,
    find,
    update
}