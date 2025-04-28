import mongoose from "mongoose";

import { handleError } from "../helpers/handleError.js";
import Contact from "../models/Contact.model.js";



export const addContact = async (req,res,next)=>{
    try {
        const {name,email,message} = req.body
        
        const contact = new Contact({
            name: name,
            email: email,
            message: message,
            
            
        })
        
        await contact.save()

        res.status(200).json({
            success : true,
            message : 'Message Send Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }
}


export const showAllContacts = async (req,res,next)=>{
    try {
        

        const contacts = await Contact.find().sort({createdAt : -1}).lean().exec()

        res.status(200).json({
            contacts
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}

export const deleteContact = async (req,res,next)=>{
    try {
        const {contactid} = req.params
        await Contact.findByIdAndDelete(contactid)
        res.status(200).json({
            success : true,
            message: 'Message Deleted Successfully.'
        })
        
    } catch (error) {
        next(handleError(500, error.message))
    }

}