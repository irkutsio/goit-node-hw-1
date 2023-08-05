const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');
console.log('>>>',contactsPath)

const listContacts = async () => {
	const allContacts = await fs.readFile(contactsPath);
	return JSON.parse(allContacts);
};

const getContactById = async contactId => {
	const allContacts = await listContacts();
	const contactById = allContacts.find(contact => contact.id === contactId);
	return contactById || null;
};

const addContact = async (name, email, phone) => {
	const newContact = {
		name,
		email,
		phone,
		id: nanoid(),
	};
	const allContacts = await listContacts();
	allContacts.push(newContact);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return newContact;
};

const removeContact = async contactId => {
	const allContacts = await listContacts();
	const idx = allContacts.findIndex(contact => contact.id === contactId);
	if (idx === -1) return null;
	const deletedContact = allContacts.splice(idx, 1);
	await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
	return deletedContact;
};

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
