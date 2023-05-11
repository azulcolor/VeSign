import Stack from '@mui/material/Stack'
import Link from 'next/link'

import styles from '../../../../../styles/admin/shipments.module.css'
import Filter from '../filters/Filter'

export default function FilterOfTemplates({
  templateNames,
  setTemplateName,
  typeOfTemplates,
  setTypeOfTemplate,
}) {
  return (
    <div className={styles.filter}>
      <Link href='/admin/templates/create' className={styles.uploadTemplate}>
        Subir template
      </Link>
      <div>
        <h1 className={styles.title}>Filtros</h1>
        <Stack spacing={2} sx={{ width: 300 }}>
          <Filter
            id={'templateName'}
            options={templateNames}
            label={'Nombre del documento'}
            set={setTemplateName}
          />

          <Filter
            id={'templateType'}
            options={typeOfTemplates}
            label={'Tipo de documento'}
            set={setTypeOfTemplate}
          />
        </Stack>
      </div>
    </div>
  )
}
