const Contact = require('./schemas/contact');

const getAllContacts = async() => {
    return Contact.find();
}

const getContactById = async (contactId) => {
    return Contact.findOne({ _id: contactId });
    // try {
    // } catch (error) {
    //     return false;
    // }
};

const addContact = async ({ name, email, phone, favorite }) => {
    return Contact.create({ name, email, phone, favorite })
    // try {
    // } catch (error) {
    //     return false;
    // }
};


const removeContact = async (contactId) => {
   return Contact.findByIdAndRemove({ _id: contactId });
    // try {
    // } catch (error) {
    //     return false;
    // }
};

const updateContact = async (contactId, body) => {
    return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true })
    // try {
    // } catch (error) {
    //     return false;
    // }
};

const updateStatusContact = updateContact;

module.exports = {
    getAllContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
    updateStatusContact,
}
