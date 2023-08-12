const service = require('../service/index');

const getAll = async (req, res, next) => {
    try {
        const contacts = await service.listContacts();
        res.json({
            status: 'success',
            code: 200,
            data: {contacts},
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getContact = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await service.getContactById(contactId);
        if (contact) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact },
            });
            return;
        }
        res.status(404).json({
            status: "Not found",
            code: 404,
        })
    } catch (error) {
        console.error(error);
    }
};

const remove = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const isDeleted = await service.removeContact(contactId);
        if (isDeleted) {
            res.json({
                status: "success",
                code: 200,
            });
        } else {
            res.status(404).json({
                status: "Not found",
                code: 404,
            });
        }
    } catch (error) {
        console.error(error);
    }
};

const create = async (req, res, next) => {
    const { name, email, phone, favorite } = req.body
    try {
        const result = await service.create({ name, email, phone, favorite })

        res.status(201).json({
            status: 'success',
            code: 201,
            data: { contact: result },
        })
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const update = async (req, res, next) => {
    const { id } = req.params
    const { name, email, phone, favorite } = req.body
    try {
        const result = await service.update(id, { name, email, phone, favorite })
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { task: result },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const updateStatus = async (req, res, next) => {
    const { id } = req.params
    const { isFavourite = false } = req.body

    try {
        const result = await service.updateStatus(id, { isFavourite })
        if (result) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact: result },
            })
        } else {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found task id: ${id}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}


module.exports = {
    getAll,
    getContact,
    remove,
    create,
    update,
    updateStatus,
}