import * as pdfLib from 'pdf-lib'

export const signPdf = async (pdf, sign, screenWidth) => {
  //Get the pdf file with this line of code
  // const pdfDocument = await pdfLib.PDFDocument.load(fs.readFileSync("prueba-lec.pdf"));
  const pdfDocument = await pdfLib.PDFDocument.load(pdf)
  //Going to use this image in the pdf but not is in it yet
  const signImage = await pdfDocument.embedPng(sign)

  //Get the form of the pdf
  const form = pdfDocument.getForm()
  //Get how many pages the pdf has
  const page = pdfDocument.getPages()
  //Get all the fields of the pdf
  const fields = form.getFields()

  //Run each field of the pdf
  fields.forEach((field) => {
    //Get the name of the field in i position
    let fieldName = field.getName()
    console.log(fieldName)
    //Get the name of that field in the pdf
    const textField = form.getTextField(fieldName)
    //Get the value of that field in the pdf
    const widgets = textField.acroField.getWidgets()

    //Run each field with the same name
    widgets.forEach((widget) => {
      //Get the values of the field box
      let { x, y, height, width } = widget.getRectangle()
      //Get the page where the field is
      let pageIndex = pdfDocument
        .getPages()
        .findIndex((p) => p.ref === widget.P())

      //If the field name is Sign then add the sign image in that field
      if (fieldName.includes('Firma')) {
        //Here we add the image on the field
        const signWidth =
          screenWidth < 768 ? signImage.width / 2 : signImage.width
        const signHeight = screenWidth < 768 ? signImage.height / 4 : signImage.height / 2
        page[pageIndex].drawImage(signImage, {
          x: x - 30,
          y: signImage.height > 250 ? y - 27 : y,
          width: signWidth,
          height: signHeight,
          rotate: pdfLib.degrees(0),
          xSkew: pdfLib.degrees(0),
          ySkew: pdfLib.degrees(0),
        })
      }
      //If the field name is Name then add the name in that field
      else if (fieldName.includes('Name')) {
        //Here we add the name on the field
        page[pageIndex].drawText(userName, {
          x,
          y,
          size: 12,
          color: pdfLib.rgb(0, 0, 0),
        })
      }
    })
  })

  //save the pdf with the new changes
  const pdfSigned = await pdfDocument.saveAsBase64()
  return pdfSigned

  //Write the pdf in the storage
  // fs.writeFileSync("documentSigned.pdf", pdfSigned);
}
