const Template = ({ parsedHTML, documentType, isOpen, setIsOpen }) => {
  const modalOpen = (isOpen) => {
    return isOpen ? "flex" : "hidden";
  };

  return (
    <div
      className={`p-5 ${modalOpen(
        isOpen
      )} flex-col items-center h-[80%]  overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0`}
    >
      <div className="relative bg-white flex items-center flex-col h-full justify-center p-10">
        <button
          className={`right-10 top-5 absolute`}
          onClick={() => setIsOpen(false)}
        >
          X
        </button>
        <div className="flex gap-10 text-red-500">
          {" "}
          <div>SOME CONTENT HERE</div>
          <div>SOME LOGO HERE</div>
        </div>
        <div className="bg-white text-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
          <h3 className="text-gray-700 ">{documentType}</h3>
          <div className="flex flex-wrap w-[500px] [&>label]:text-gray-700  text-gray-700 gap-[10px] mt-[20px]">
            {parsedHTML}
          </div>
        </div>
        <div className="flex gap-10 text-red-500">
          {" "}
          <div>SOME FOOTER HERE</div>
          <div>SOME FOOTER HERE</div>
        </div>
      </div>
    </div>
  );
};

export default Template;
