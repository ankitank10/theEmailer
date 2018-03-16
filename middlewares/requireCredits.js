module.exports = (req, res, next) => {
    if(req.user.credits < 1){
        return res.status(402).send({error:"User must have atleast 1 credit. Please add credits !!!"});
    }
    next();
}