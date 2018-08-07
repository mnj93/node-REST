

module.exports.FormatResponse = (status,message,data=[]) =>{
    const jsonResponse = {
        success:status,
        msg:message,
        data:data
    }
    return jsonResponse;
}