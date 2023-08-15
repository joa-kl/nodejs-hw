const Joi = require('joi');
const service = require('../service/index');

const contactValidation = Joi.defaults(() =>
    Joi.object({
        name: Joi.string().pattern(
            /^([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+) ([A-ZĄĆĘŁŃÓŚŹŻ]+'?[a-ząćęłńóśźż]+|[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+'?[a-ząćęłńóśźż]+)$/
        ),
        email: Joi.string().email(),
        phone: Joi.string().pattern(
            /^([+][0-9]{0,4})?[\s]?([(][0-9]{1,3}[)])?[\s]?[0-9]{2,3}[-\s]?[0-9]{2,3}[-\s]?[0-9]{2,4}$/
        ),
        favourite: Joi.boolean()
    })
);

const schemaRequired = contactValidation
    .object()
    .options({ presence: "required" })
    .required();

const schema = contactValidation.object().or("name", "email", "phone");


const getAll =  async (req, res, next) => {
    try {
        const results = await service.getAllContacts()
        res.json({
            status: 'success',
            code: 200,
            data: { results },
        })
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const getContact = async (req, res, next) => {
    const { contactId } = req.params;
    try {
        const contact = await service.getContactById(contactId);
        if (contact) {
            res.json({
                status: 'success',
                code: 200,
                data: { contact },
            });
            return;
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
    const { name, email, phone } = req.body
    const validation = schemaRequired.validate({ name, email, phone });
        if (validation.error) {
            res.status(400).json({
                message: validation.error.details[0].message,
                code: 400,
            });
            return;
    }

    try {
        const result = await service.addContact({ name, email, phone })

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
    const { contactId } = req.params
    const { name, email, phone } = req.body
    const validation = schema.validate({ name, email, phone });
        if (validation.error) {
            res.status(400).json({
                message: validation.error.details[0].message,
                code: 400,
            });
            return;
    }

    try {
        const result = await service.updateContact(contactId, { name, email, phone })
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
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e)
        next(e)
    }
}

const updateStatus = async (req, res, next) => {
    const { contactId } = req.params
    const { favourite = false } = req.body
    const validation = schemaRequired.validate({ favourite });
    if (validation.error) {
        res.status(400).json({
            message: validation.error.details[0].message,
            code: 400,
        });
        return;
    }

    try {
        const result = await service.updateStatusContact(contactId, { favourite })
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
                message: `Not found contact id: ${contactId}`,
                data: 'Not Found',
            })
        }
    } catch (e) {
        console.error(e.message = "missing field favorite");
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