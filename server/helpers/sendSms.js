import 'dotenv/config'
import axios from 'axios'

const frontRoute = process.env.FRONTEND_ROUTE
const link = `${frontRoute}/sign/`

export const sendSms = async (cellPhone, token, reference) => {
  
  const response = await axios
    .post('https://www.itclubs.com.mx:9751/CheckPhone/Sms/enviarSMS', {
      user: process.env.USER,
      key: process.env.KEY,
      celular: cellPhone,
      message: `VCM: Para realizar su firma, ingrese al siguiente link: ${link}${token}`,
      reference: `SG-${reference}`,
    })

    console.log(response.data)
    
}
