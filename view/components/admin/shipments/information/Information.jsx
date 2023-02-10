import Data from './Data'
import Status from './Status'
import styles from '../../../../styles/admin/shipments.module.css'
import Button from './Button'

export default function Information({ client }) {
  return (
    <div className={styles.info}>
      <Data title='Nombre' info={client.fullname} />
      <Data title='Número telefónico' info={client.phoneNumber} />
      <Data title='Correo electrónico' info={client.email} />
      <Data title='Número de contrato' info={client.contractNumber} />
      <Status idStatus={client.idStatus} info={client.statusName} />
      <Button idStatus={client.idStatus} idDocument={client.idDocument} />
    </div>
  )
}
