const User = require("../model/user");

async function handleGetAllUsers(req,res){
    const allDbUsers=await User.find({});
    return res.json(allDbUsers);
}

async function handleGetUserById(req,res){
    const user =await User.findById(req.params.id);
    if(!user) return res.status(404).json({error:"user not found"});
    return res.json(user);
}

async function handleUpdateUserById(req, res) {
    await User.findByIdAndUpdate(req.params.id, req.body);
    return res.json({ status: "success" });
}

async function handleDeleteUserById(req,res){
    await User.findByIdAndDelete (req.params.id)
    return res.json({status: "success"});
}

async function handleCreateNewUser(req, res) {
    const body = req.body;
    if (!body || !body.firstName || !body.lastName || !body.email || !body.gender || !body.jobTitle) {
        return res.status(400).json({ msg: "All fields are required" });
    }
    const result = await User.create(body);
    return res.status(201).json({
        msg: "success",
        id: result._id
    });
}

module.exports ={
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}