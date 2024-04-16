import 'dotenv/config';
import nodemailer from 'nodemailer'; 
import template from './template.js';



const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    }
});

export const sendEmail = async (email, client, token) => {

    const frontRoute = process.env.FRONTEND_ROUTE;

    let mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: `Solicitud de firma de documento de VCM Capital`,
        text: `Un cordial saludo ${client}, se ha enviado un documento para su firma. Por favor ingrese al siguiente link para firmar el documento: ${frontRoute}/sign/${token}`,
        html: template(`${frontRoute}/sign/${token}`, client)
    };

    transporter.sendMail(mailOptions, (err, data) => {
        if(err){
            console.log(process.env.EMAIL)
            console.log('Error: ', err);
        } else {
            console.log('Se ha respondiendo el correo satisfactoriamente');
        }
    });



};
