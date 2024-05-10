const Template = ({ parsedHTML, documentType }) => {
  return (
    <div className="bg-white p-5 flex flex-col items-center">
      <h4>HEADER DOCUMENT PREVIEW</h4>
      <div className="bg-white text-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
        <h3 className="text-gray-700 ">{documentType}</h3>
        <div className="flex flex-wrap w-[500px] [&>label]:text-gray-700  text-gray-700 gap-[10px] mt-[20px]">
          {parsedHTML}
        </div>
      </div>
      <div>FOOTER</div>
    </div>
  );
};

export default Template;
