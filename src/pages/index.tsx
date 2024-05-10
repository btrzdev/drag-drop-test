import Image from "next/image";
import { Inter } from "next/font/google";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useForm } from "react-hook-form";
import { Children, useEffect, useRef, useState } from "react";
import React from "react";
import parse, { domToReact } from "html-react-parser";
import Template from "../components/Template";
const inter = Inter({ subsets: ["latin"] });

const SUBJECT = [
  "Grid",
  "Provisional Classification",
  "Provisional Classification Updated",
  "Final Classification",
  "Track Limits",
  "Summon",
  "Bulletin",
  "Protest",
  "Grid",
];

const SESSION = [
  "Drivers Briefing",
  "Team Manager Meeting",
  "Free Pratice",
  "Pre Qualifying Session",
  "Qualifying Session",
  "Race 1",
  "Race 2",
  "N/A",
];

export default function Home() {
  const [renderedElements, setRenderedElements] = useState<string>();
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => setData(data);
  const [data, setData] = useState();

  const returningFieldValue = (name: string) => {
    if (data) {
      console.log("data", data[name]);
      return data[name];
    }
  };

  const [parent, tapes] = useDragAndDrop<HTMLFormElement>([
    <label className="flex flex-col hover:cursor-grab text-white" id="label">
      Subject
      <select
        {...register("subject")}
        className="text-white rounded-[2px] bg-gray-800 w-[200px] h-[50px] hover:cursor-grab"
      >
        <option>Select Subject</option>
        {SUBJECT.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>,
    <label className="flex flex-col hover:cursor-grab text-white">
      Session
      <select
        {...register("session")}
        className="text-white rounded-[2px] bg-gray-800 w-[200px] h-[50px]"
      >
        <option>Select Session</option>
        {SESSION.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>,
    <label className="flex flex-col hover:cursor-grab text-white">
      Message:
      <textarea
        {...register("message")}
        className="text-white rounded-[2px] bg-gray-800 w-[500px]"
      />
    </label>,
  ]);

  const htmlSample = parent.current?.innerHTML ?? "";

  const options = {
    replace({ attribs, children }) {
      if (attribs && attribs.name === "session") {
        return (
          <div
            className={attribs.class}
            style={{ backgroundColor: "white", color: "black" }}
          >
            {returningFieldValue(attribs.name)}
          </div>
        );
      }
      if (attribs && attribs.name === "message") {
        return (
          <div
            className={`${attribs.class}`}
            style={{ backgroundColor: "white", color: "black" }}
          >
            {returningFieldValue(attribs.name)}
          </div>
        );
      }
      if (attribs && attribs.name === "subject") {
        return (
          <div
            className={attribs.class}
            style={{ backgroundColor: "white", color: "black" }}
          >
            {returningFieldValue(attribs.name)}
          </div>
        );
      }
    },
  };

  const parsedHTML = parse(htmlSample, options);

  const nodeRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setRenderedElements(parent.current?.innerHTML);
  }, [tapes]);

  return (
    <div className="flex flex-col">
      <div className="bg-gray-700 w-full h-full py-[100px] justify-center items-center flex flex-col">
        <h2 className="font-bold text-white">TECHNICAL DELEGATE REPORT</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="">
          <div
            className="flex flex-wrap w-[500px]  gap-[10px] mt-[20px]"
            ref={parent}
          >
            {tapes.map((tape, index) => (
              <React.Fragment key={index}>{tape}</React.Fragment>
            ))}
          </div>
          <button
            className="bg-green-500 p-[10px] font-bold text-white rounded-sm mt-[10px]"
            type="submit"
            onSubmit={handleSubmit(onSubmit)}
          >
            SEE PREVIEW
          </button>
        </form>
      </div>
      <Template
        parsedHTML={parsedHTML}
        documentType={"TECHNICAL DELEGATE REPORT"}
      />
    </div>
  );
}
