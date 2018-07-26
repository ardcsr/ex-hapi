import * as  Boom from 'boom';
import * as Joi from 'joi';
import * as JWT from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { Util } from '../util';
import { config } from '../index';
import { mail } from '../mail';
const mongoObjectId = ObjectId;

module.exports = [
    {  // Send mail
        method: 'POST',
        path: '/email/send',
        config: {
            auth: false,
            description: 'Sent email',
            notes: 'Sent email',
            tags: ['api'],
            validate: {
                payload: {
                    objective: Joi.string(),
                    position: Joi.string(),
                    msg: Joi.string(),
                    name: Joi.string(),
                    company: Joi.string(),
                    tel: Joi.string(),
                    mail: Joi.string(),
                },
            },
        },
        handler: async (req, reply) => {
            try {
                const payload = req.payload;
                const mongo = Util.getDb(req);
                payload.crt = Date.now();
                const receiver = await mongo.collection('content').find().toArray();
                payload.receiver = receiver[0].en.contentFourth.email;
                const sendmail = await mail(payload);
                const insert = await mongo.collection('mail-send').insertOne(payload);
                return ({
                    msg: 'OK',
                    statusCode: 200,
                });
            } catch (error) {
                return (Boom.badRequest(error));
            }
        },
    },
];
