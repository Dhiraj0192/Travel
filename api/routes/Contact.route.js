import express from "express"
import { addContact, deleteContact, showAllContacts } from "../controllers/Contact.controller.js"


const ContactRoute = express.Router()

ContactRoute.post('/add-message', addContact)
ContactRoute.get('/messages',showAllContacts)
ContactRoute.delete('/delete/:contactid',deleteContact)



export default ContactRoute