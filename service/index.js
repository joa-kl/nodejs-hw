const Contacts = require('./schemas/contact');

const listContacts = async () => await Contacts.find();

const getContactById = async (contactId) => {
    try {
        return Contacts.findOne({ _id: contactId });
    } catch (error) {
        return false;
    }
};

const addContact = async ({ name, email, phone, favorite }) => {
    try {
        Contacts.create({ name, email, phone, favorite })
    } catch (error) {
        return false;
    }
};


const removeContact = async (contactId) => {
    try {
        Contacts.findByIdAndRemove({ _id: contactId });
    } catch (error) {
        return false;
    }
};

const updateContact = async (contactId, body) => {
    try {
        Contacts.findByIdAndUpdate({ _id: contactId }, body, { new: true })
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
