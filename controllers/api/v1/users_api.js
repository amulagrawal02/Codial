const User = require('../../../models/userSchema');
const jwt = require('jsonwebtoken');


module.exports.createSession = async function (req, res) {
    try 
    {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password)
        {
            console.log("Invaild user or passpord in user_api");
            return res.json(422,{
                message : "Invaild User or Password"
            })
        }
        return res.json(200,{
            message : "jwt created successfully",
            data : {
                token : jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
            }
        })

    }
    catch (err)
    {
        console.log('Error while creating jwt for user in user_api',err)
        return res.json(500, {
            message: "Internal Server Error"
        })
    }

}