//import Contact model
const Contact = require('../models/contact');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + (file.originalname));
    }
});

const uploadImg = multer({storage: storage}).single('image');


// newContact function for post contact route
const newContact = (req, res, next) => {
    Contact.findOne({ email: req.body.email }, (err, data) => {

        //if contact not in db, add it
        if (!data) {
            //create a new contact object using the Contact model and req.body
            const newContact = new Contact({
                fName:req.body.fName,
                lName: req.body.lName,
                image: req.file.path,
                email: req.body.email,
                phoneNumber: req.body.phoneNumber,
            })

            // save this object to database
            newContact.save((err, data)=>{
                if(err) return res.json({Error: err});
                return res.json(data);
            })
            //if there's an error or the contact is in db, return a message
        }else{
            if(err) return res.json(`Something went wrong, please try again. ${err}`);
            return res.json({message:"Contact already exists"});
        }
    })
};

//GET '/contact'
const getAllContact = (req, res, next) => {
    Contact.find({}, (err, data)=>{
        if (err){
            return res.json({Error: err});
        }
        return res.json(data);
    })
};

//GET '/contact/:contact'
const getOneContact = (req, res, next) => {
    const _id = req.params._id; //get the contact id
    typeof _id;

    //find the specific contact with that id
    Contact.findById({_id:_id}, (err, data) => {
        if(err || !data) {
            return res.json({message: "Contact doesn't exist."});
        }
        else return res.json(data); //return the contact object if found
    });
};

//Put '/contact/:contact'
const updateOneContact = async (req, res, next) => {
    const _id = req.params._id; //get the contact name
    typeof _id;

    const update = new Contact({
        fName:req.body.fName,
        lName: req.body.lName,
        image: req.file.path,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
    })


    Contact.findOneAndUpdate(_id, {$set: {
            fName:req.body.fName,
            lName: req.body.lName,
            image: req.file.path,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
        }},
    function (err, docs) {
        if (err){
            return res.json({ message: err});
        }
        else{
            return res.json({ message: "Updated User : ", update });
        }
    });

};

//DELETE '/contact/:contact'
const deleteOneContact = (req, res, next) => {
    const _id = req.params._id; //get the contact id
    typeof _id;

    Contact.deleteOne({_id:_id}, (err, data) => {
        //if there's nothing to delete return a message
        if( data.deletedCount == 0) return res.json({message: "Contact doesn't exist."});
        //else if there's an error, return the err message
        else if (err) return res.json(`Something went wrong, please try again. ${err}`);
        //else, return the success message
        else return res.json({message: "Contact deleted."});
    });
};



module.exports = {
    newContact,
    getAllContact,
    deleteOneContact,
    updateOneContact,
    uploadImg,
    getOneContact
};