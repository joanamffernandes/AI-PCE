let UserSchema = require('../model/users');

module.exports.newUser = async (username, password, first_name, last_name, email) => {
    try {
        let user = await UserSchema({
            username: username,
            password: password,
            first_name: first_name,
            last_name: last_name,
            email: email
        });
        let response = await user.save();
        return {success: true, response: response};
    } catch (err) {
        console.log(err);
        return {success: false, response: err}
    }
}

module.exports.listUsers = async () => {
    try {
        return await UserSchema.find();
    } catch (err) {
        console.log(err);
        throw new Error('Error listing all users. Reason:  ' + err.message);
    }
}

module.exports.getByUsername = async (username) => {
    try {
        return await UserSchema.findOne({username: username});
    } catch (err) {
        console.log(err);
        throw new Error('Error getting username "' + username + '". Reason:  ' + err.message);
    }
}


module.exports.getUserByEmail = async (email) => {
    try {
        return await UserSchema.findOne({email: email});
    } catch (err) {
        console.log(err);
        throw new Error('Error getting email "' + email + '". Reason:  ' + err.message);
    }
}