import { ALREADY_EXISTS } from "../../../libs/errors.js";
export const checkUser = (app) => async (request, reply) => {
    const users = app.mongo.db.collection('users');
    let user = request.body
    let result = await users.count({name: user.username});

    if(result > 0) throw new ALREADY_EXISTS();
}