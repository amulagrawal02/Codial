module.exports.index = function(req,res)
{
    return res.json(200,{
        message : 'This is list of post v2',
        post : '[[]]'
    })
}