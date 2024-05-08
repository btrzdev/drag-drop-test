import Image from "next/image";
import { Inter } from "next/font/google";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import React from "react";

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
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = (data: any) => console.log(data);

  

  
  const [
    parent,
    tapes] =
    useDragAndDrop<HTMLFormElement>([
      <label className="flex flex-col hover:cursor-grab text-white">
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
        <textarea {...register("lastName")} className="text-white rounded-[2px] bg-gray-800 w-[500px] h-[300px]" />
      </label>
    ]);

    

    const nodeRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
      setRenderedElements(parent.current?.innerHTML)
    }, [tapes]);



    const template = <div>
    <head>HEADER PDF</head>
    <div className="bg-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
  
    <form
        className="flex w-auto flex-wrap w-[600px] gap-[10px] mt-[20px]" dangerouslySetInnerHTML={{ __html: renderedElements }}>
 
        
       </form>
       
    </div>
   

    <footer>HEADER PDF</footer>
  </div>


  return (
    <div className="bg-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
      <h2 className="font-bold text-white"> TECHNICAL DELEGATE REPORT
      </h2>
      <
        form
        className="flex w-auto flex-wrap w-[600px] gap-[10px] mt-[20px]"
        ref={
          parent}>
        {
          tapes.
            map((
              tape) => (
              <>{tape}</>
            ))}
        
      </
      form>
      <button className="bg-green-500 p-[10px] font-bold text-white rounded-sm mt-[10px]" onClick={() => console.log(parent.current)}>SEE PREVIEW</button>

 <div>{template}</div>
    </div>
    

  );
}
