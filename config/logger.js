const {
    createLogger,
    transports,
    format
} = require('winston');
require('winston-mongodb');
const logger = createLogger({
    format: format.combine(format.timestamp(), format.simple()),
    transports: [
        new transports.Console({
            level: 'info',
        }),
        new transports.Console({
            level: 'silly',
        })

        // new transports.File({
        //     filename: 'info.log',
        //     level: 'info',
        //     format: format.combine(format.timestamp(), format.json())
        // }),
        // new transports.MongoDB({
        //     level: 'error',
        //     db: process.env.MONGODB,
        //     options: {
        //         useUnifiedTopology: true
        //     },
        //     collection: 'babaji',
        //     format: format.combine(format.timestamp(), format.splat(), format.json())
        // })
    ]
})

module.exports = logger;