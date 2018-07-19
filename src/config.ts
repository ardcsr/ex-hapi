
import * as pathSep from 'path';
module.exports = {
    dev: {
        path: {
            upload: pathSep.join(__dirname, 'uploads'),
            pdf: pathSep.join(__dirname, 'uploads', 'document.pdf'),
        },
        hapi: {
            router: { routes: 'dist/routes/*.js' }
        },
        fileType: {
            images: [
                'png',
                'jpg',
                'jpeg',
            ],
            pdf: ['pdf','png','jpg','jpeg'],
        },
        jwt: {
            timeout: '8h',
            refreshInterval: 30 * 60 * 1000 // 30 mins
        },
        timezone: {
            thai: 7 * 60 * 60 * 1000
        },
        regex: /[\S]+/,
        mail: {
            DOMAIN: `mg.codth.com`,
            API_KEY: `key-b09165d35576ee942a4158800f0282af`,
        },
    }
};
