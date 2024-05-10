"use client";
import html2canvas from "html2canvas";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";
import { jsPDF } from "jspdf";

const Template = ({ parsedHTML, documentType, isOpen, setIsOpen }) => {
  const modalOpen = (isOpen) => {
    return isOpen ? "flex" : "hidden";
  };

  const exportPdf = () => {
    const element = document.getElementById("myPage");

    if (!element) {
      console.error('Element with id "myPage" not found');
      return;
    }

    htmlToImage
      .toPng(element)
      .then((dataUrl) => {
        const pdf = new jsPDF();
        pdf.addImage(dataUrl, "PNG", 10, 10);
        pdf.save("download.pdf");
      })
      .catch((error) => {
        console.error("Error exporting PDF:", error);
      });
  };

  return (
    <div
      className={`p-5 ${modalOpen(
        isOpen
      )} items-center h-full overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center bg-opacity-100 w-full bg-gray-700`}
    >
      <div
        className="bg-white flex items-center flex-col min-h-[1000px] justify-between p-10"
        id={"myPage"}
      >
        <div className="flex gap-10 text-red-500">
          {" "}
          <div>SOME CONTENT HERE</div>
          <div>SOME LOGO HERE</div>
        </div>
        <div className="bg-white text-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
          <h3 className="text-gray-700 ">{documentType}</h3>
          <div className="flex flex-wrap w-[500px] [&>label]:text-gray-700 text-gray-700 gap-[10px] mt-[20px]">
            {parsedHTML}
          </div>
        </div>
        <div className="flex gap-10 text-red-500">
          {" "}
          <div>SOME FOOTER HERE</div>
          <div>SOME FOOTER HERE</div>
        </div>
      </div>
      <div className="flex flex-col gap-10 ml-10">
        <button
          className="bg-green-500 p-[10px] font-bold rounded-sm mt-[10px]"
          onClick={() => exportPdf()}
        >
          DOWNLOAD PDF
        </button>
        <button
          className="bg-red-500 p-[10px] font-bold rounded-sm mt-[10px]"
          onClick={() => setIsOpen(false)}
        >
          CLOSE PREVIEW
        </button>
      </div>
    </div>
  );
};

export default Template;
