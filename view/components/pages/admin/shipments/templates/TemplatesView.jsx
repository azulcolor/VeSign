import { useState } from 'react'

import styles from '../../../../../styles/admin/shipments.module.css'
import PDFViewer from '../../../../general/document/PdfViewer'
import Form from '../users/Form'
import FormContent from './FormContent'
import {
  desactivateTemplate,
  updateTemplate,
} from '../../../../../hooks/api/fetcher'
import { deleteAlert } from '../../../../../services/sweetAlert'

export default function TemplatesView({
  templatesDataFiltered,
  typeOfTemplates,
}) {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(null)

  return (
    <>
      {templatesDataFiltered.map(templateData => {
        return (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <p className={styles.name}>Nombre: {templateData.pdfName}</p>
                <p className={styles.type}>Tipo: {templateData.documentType}</p>
              </div>

              <div>
                <button
                  className={styles.orangeButton}
                  onClick={() => setOpen(true)}
                >
                  Editar
                </button>
                <button
                  className={styles.redButton}
                  onClick={() =>
                    deleteAlert(desactivateTemplate, templateData.idTemplate)
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
            <PDFViewer file={templateData.pdfTemplate} />
            <Form
              open={open}
              setOpen={setOpen}
              setEdit={setEdit}
              updateById={updateTemplate}
              edit={edit}
              data={templatesDataFiltered}
              id={templateData.idTemplate}
            >
              <FormContent
                setEdit={setEdit}
                data={templateData}
                typeOfTemplates={typeOfTemplates}
              />
            </Form>
          </>
        )
      })}
    </>
  )
}
