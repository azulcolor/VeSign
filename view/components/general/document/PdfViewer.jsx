// import default react-pdf entry
import { Document, Page, pdfjs } from 'react-pdf'
// import pdf worker as a url, see `next.config.js` and `pdf-worker.js`
import workerSrc from '../../../pdfWorker.js'
import Controller from './Controller.jsx'
import styles from '../../../styles/general/documentControl.module.css'
import { useDocument } from '../../../hooks/documents/useDocument.js'

pdfjs.GlobalWorkerOptions.workerSrc = workerSrc

export default function PDFViewer({ file }) {
  const { page, numPages, setNumPages, next, prev } = useDocument()

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages)
  }

  return (
    <>
      <div>
        <div className={styles.documentContainer}>
          <Document
            file={`data:application/pdf;base64,${file}`}
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page pageNumber={page} />
          </Document>
        </div>

        <Controller numPages={numPages} page={page} next={next} prev={prev} />
      </div>
    </>
  )
}
