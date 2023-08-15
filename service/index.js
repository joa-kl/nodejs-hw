const Contact = require('./schemas/contact');

const getAllContacts = async() => {
    return Contact.find()
}

const getContactById = async (contactId) => {
    return Contact.findOne({ _id: contactId })
};

const addContact = async ({ name, email, phone, favorite }) => {
    return Contact.create({ name, email, phone, favorite })
};


const removeContact = async (contactId) => {
   return Contact.findByIdAndRemove({ _id: contactId })
};

const updateContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
};

const updateStatusContact = async (contactId, favorite) => {
    return Contact.findByIdAndUpdate(contactId, {favorite})
};

module.exports = {
    getAllContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}
