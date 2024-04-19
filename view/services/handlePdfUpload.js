export const handlePdfUpload = (e, setTemplateData, setSelectedFile) => {
  const file = e.target.files[0]
  var pdfConvertered = ''

  if (!file) {
    return
  }

  const reader = new FileReader()

  reader.onloadend = () => {
    if (
      typeof reader.result === 'string' &&
      reader.result.startsWith('data:application/pdf')
    ) {
      pdfConvertered = reader.result.replace('data:application/pdf;base64,', '')
      setTemplateData(value => ({
        ...value,
        pdfTemplate: pdfConvertered,
      }))
      setSelectedFile(file.name)
    } else {
      // El archivo seleccionado no es un PDF, manejar el error aquí
    }
  }

  reader.readAsDataURL(file)
}
