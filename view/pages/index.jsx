import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../components/general/document/PdfViewer"), {
  ssr: false
});

export default function PDF() {
  return <h1>Eu</h1>;
}
