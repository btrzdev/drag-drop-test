import Image from "next/image";
import { Inter } from "next/font/google";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useForm } from "react-hook-form";
import { Children, useEffect, useRef, useState } from "react";
import React from "react";
import parse, { domToReact } from 'html-react-parser';

const inter = Inter({ subsets: ["latin"] });



const SUBJECT = [
  "Grid", "Provisional Classification", "Provisional Classification Updated", "Final Classification", "Track Limits", "Summon",
  "Bulletin", "Protest", "Grid"
]

const SESSION = [
  "Drivers Briefing", "Team Manager Meeting", "Free Pratice", "Pre Qualifying Session", "Qualifying Session", "Race 1", "Race 2", "N/A"

]


export default function Home() {
  const [renderedElements, setRenderedElements] = useState<string>();
  const { register, handleSubmit, getValues, formState: { errors } } = useForm();
  const onSubmit = (data: any) => setData(data);
  const [data, setData] = useState()


  const returningFieldValue = (name: string) => {
      if(data){
        console.log("data", data[name])
        return data[name]
      }
   
  };

  const [
    parent,
    tapes] =
    useDragAndDrop<HTMLFormElement>([
      <label className="flex flex-col hover:cursor-grab text-white" id="label">
        Subject
        <select {...register("subject")} className="text-white rounded-[2px] bg-gray-800 w-[200px] h-[50px] hover:cursor-grab">
          <option>Select Subject</option>
          {SUBJECT.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </label>,
      <label className="flex flex-col hover:cursor-grab text-white">
        Session
        <select {...register("session")} className="text-white rounded-[2px] bg-gray-800 w-[200px] h-[50px]">
          <option>Select Session</option>
          {SESSION.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </label>
      ,
      <label className="flex flex-col hover:cursor-grab text-white">
        Message:
        <textarea {...register("message")} className="text-white rounded-[2px] bg-gray-800 w-[500px] h-[300px]" />
      </label>
    ]);    


    const renderFormControls = () => {
      if (parent.current && parent.current.children) {
        return Array.from(parent.current.children).map((control: Element, index: number) => {
          if (control instanceof HTMLInputElement) {
            return (
              <div key={index}>
                <label className="flex flex-col hover:cursor-grab text-white">
                  {control.name}:
                  <p>{control.name}</p>
                </label>
              </div>
            );
          } else if (control instanceof HTMLSelectElement) {
            return (
              <div key={index}>
                <label className="flex flex-col hover:cursor-grab text-white">
                  {control.name}:
                  <select
                    className="text-white rounded-[2px] bg-gray-800 w-[200px] h-[50px]"
                    name={control.name}
                    value={control.value}
                    onChange={(e) => {
                      // Handle select changes if needed
                    }}
                  >
                    {Array.from(control.options).map((option, optionIndex) => (
                      <option key={optionIndex} value={option.value}>
                        {option.textContent}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            );
          } else if (control instanceof HTMLTextAreaElement) {
            return (
              <div key={index}>
                <label className="flex flex-col hover:cursor-grab text-white">
                  {control.name}:
                  <textarea
                    className="text-white rounded-[2px] bg-gray-800 w-[500px] h-[300px]"
                    name={control.name}
                    value={control.value}
                    onChange={(e) => {
                      // Handle textarea changes if needed
                    }}
                  />
                </label>
              </div>
            );
          }
          return null;
        });
      }
      return null;
    };

    const htmlSample = parent.current?.innerHTML ?? ""

    const options = {
      replace({ attribs, children }) {
        if (attribs && attribs.name === "session") {
         return  <div className={attribs.class}>{returningFieldValue(attribs.name)}</div>
        
        }
        if (attribs && attribs.name === "message") {
          return  <div className={attribs.class}>{returningFieldValue(attribs.name)}</div>
         
         }
         if (attribs && attribs.name === "subject") {
          return  <div className={attribs.class}>{returningFieldValue(attribs.name)}</div>
         
         }
      }
      
    };

    const parsedHTML = parse(htmlSample, options)

    console.log("teste", options )
    const nodeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setRenderedElements(parent.current?.innerHTML)
    }, [tapes]);

   
    const template = 
    <div className="bg-white p-5">
    <h4>HEADER PREVIEW</h4>
    <div className="bg-white text-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">  
    <div className="flex flex-wrap w-[500px]  gap-[10px] mt-[20px]">{parsedHTML}</div>       
    </div> 
    <div>FOOTER</div>
  </div>
  const childNodesArray = Array.from(parent.current?.childNodes || []);

  console.log("parsedHTML", parsedHTML)


return (
  <div className="flex">
     <div className="bg-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
    <h2 className="font-bold text-white">TECHNICAL DELEGATE REPORT</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="">
      <div className="flex flex-wrap w-[500px]  gap-[10px] mt-[20px]" ref={parent}>
        {tapes.map((tape, index) => (
          <React.Fragment key={index}>{tape}</React.Fragment>
        ))}
      </div>
      <button className="bg-green-500 p-[10px] font-bold text-white rounded-sm mt-[10px]" type="submit" onSubmit={handleSubmit(onSubmit)}>
        SEE PREVIEW
      </button>
    </form>
   
  </div>
     <div>{template}</div>
  </div>
 
);
}
