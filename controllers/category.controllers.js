const Category = require("../schemas/category.schema")
const { responseCreator } = require("../utils/utils");

async function getCategories(req, res) {
        // responseCreator(res, 200, "Orden obtenida correctamente");
        try {
                const categories = await Category.find()
                if (!categories) {
                        return responseCreator(res, 404, "No se encontraron categorias");
                    }
                return responseCreator(res, 201,"Categorias obtenidas", {categories}) //los elementos estan en response.data.categories. 
        } catch (error) {
                console.log(error);
                return responseCreator(res, 500,"No se pudieron cargar las categorias")
        }
}

async function createCategory(req, res) {
        // responseCreator(res, 200, "Orden obtenida correctamente");
        try {
                const category = new Category(req.body)
                const newCategory = await category.save()

                return res.status(201).send({
                        msg: `Categoria Creada`,
                        newCategory
                });
        } catch (error) {
                console.log(error);
                return responseCreator(res, 500, "No se pudo crear la categoria")
                //return res.status(500).msg("No se pudo crear la categoria")
        }
}
module.exports = {
        getCategories,
        createCategory
}