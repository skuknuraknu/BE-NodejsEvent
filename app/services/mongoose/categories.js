const Categories = require("../../api/v1/categories/model")
const { BadRequestError } = require("../../errors")

const getAllCategories = async ( res ) => {
	const result = await Categories.find()
	return result
}
const createCategories = async ( req ) => {
	const { name } = req.body
	const check = await Categories.findOne({ name })
	if ( check ) {
		throw new BadRequestError("Kategori sudah ada")
	}
	const result = await Categories.create({ name })
	return result
}

const getOneCategories = async ( req ) => {
	const { id } = req.params
    const result = await Categories.findOne({ _id: id }).select("_id name")
    return result
}

module.exports = { getAllCategories, createCategories }