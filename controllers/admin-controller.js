const User=require("../models/user-model");
const Contact=require("../models/contact-model");

/*get all users logic*/
const getAllUsers=async(req,res)=>{
    try {
        const users=await User.find({},{password:0});
        console.log(users);
if(!users||users.length===0){
    return res.status(404).json({message:"No users found"});
}
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
};

/*single user data*/
const getUserById=async (req,res)=>{
    try {
        const id=req.params.id;
        const data=await User.findOne({_id:id},{password:0});
        return res.status(200).json(data);
    } catch (error) {
        next(error);
    }
    };

/*user update logic*/
const updateUserById=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateUserData=req.body;

        const updatedData=await User.updateOne({_id:id},
        {
            $set:updateUserData,
        }
        );
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}


/*delete user logic*/
const deleteUserById=async (req,res)=>{
try {
    const id=req.params.id;
    await User.deleteOne({_id:id});
    return res.status(200).json({message:"User deleted successfully"});
} catch (error) {
    next(error);
}
};

/*get all contacts logic*/
const getAllContacts=async(req,res)=>{
    try {
        const contacts=await Contact.find();
        console.log(contacts);
        if(!contacts||contacts.length===0){
            return res.status(404).json({message:"No contacts found"});
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
};

/*contacts delete logic*/
const deleteContactById=async (req,res)=>{
    try {
        const id=req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"Contact deleted successfully"});
    } catch (error) {
        next(error);
    }
    };

module.exports={getAllUsers,getAllContacts,deleteUserById,getUserById,updateUserById,deleteContactById,};