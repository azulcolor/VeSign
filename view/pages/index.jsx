import dynamic from "next/dynamic";

const PDFViewer = dynamic(() => import("../components/general/PdfViewer"), {
  ssr: false
});

export default function PDF() {
  return <PDFViewer />;
}
