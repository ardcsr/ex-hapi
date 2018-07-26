import { Util } from './util';
import { config } from './index';
// import * as mailgun from 'mailgun-js'({apiKey: api_key, domain: domain})
const api_key = process.env.API_KEY_MAILGUN || config.mail.API_KEY; // ;
const domain = config.mail.DOMAIN;
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
// const sgMail = require('@sendgrid/mail');
const mail = (option: Info) => {

    // setup email data with unicode symbols
    const mailOptions = {
        from: `no-reply<no-reply@mg.codth.com>`, // sender address
        to: option.receiver, // adoma@adoma-jewel-manufact.com

        subject: `Jeweal`, // Subject line
        html: `<b>Objective : </b> ${option.objective} <br>
                   <b>I am : </b> ${option.position} <br>
                   <b>Message : </b> ${option.msg} <br>
                   <b>Contact person : </b> ${option.name} <br>
                   <b>Company name : </b> ${option.company} <br>
                   <b>Phone number : </b> ${option.tel} <br>
                   <b>Email address : </b> ${option.mail} <br>
                    ` // html body
    };
    return new Promise((resolve, reject) => {
        // send mail with defined transport object
        mailgun.messages().send(mailOptions, (error, body) => {
            if(error){
                reject(error);
            }
            resolve(body);
        });
    });
};

interface Info {
    objective: string;
    position: string;
    msg: string;
    name: string;
    company: string;
    tel: string;
    mail: string;
    receiver: string;
}

export { mail };
