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
    }
}

const get = async (req, res, next) => {
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

module.exports = {
    getAll,
    get,
    remove,
    
}