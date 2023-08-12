const Contact = require('./schemas/contact');

const listContacts = async () => await Contact.find();

const getContactById = async (contactId) => {
    try {
        return Contact.findOne({ _id: contactId });
    } catch (error) {
        return false;
    }
};

const addContact = async (body) => {
    try {
        Contact.create({})
    } catch (error) {
        return false;
    }
};


const removeContact = async (contactId) => {
    try {
        Contact.findByIdAndRemove({_id: contactId})
    } catch (error) {
        return false;
    }
};

const updateContact = async (contactId, body) => {
    try {
        Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
    } catch (error) {
        return false;
    }
};

const updateStatusContact = updateContact;


module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}
