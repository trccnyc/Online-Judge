import { useState ,useEffect} from "react";
import { run } from "../services/run";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import { submit } from "../services/submit_code";


const defaultCodes={'cpp':`#include <iostream>

    int main() {
        std::cout << "Hello, World!" << std::endl;
        return 0;
    }
    `,'c':`#include <stdio.h>
    
    int main() {
        printf("Hello, World!");
        return 0;
    }        
    `,'py':`print("Hello, World!")
    `,'java':`public class HelloWorld {
        public static void main(String[] args) {
            System.out.println("Hello, World!");
        }
    }
    `}
export const Render_compiler = ({id}) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState("cpp");
    const [input, setInput] = useState("");
    const [output, setOutput] = useState("");
    useEffect(()=>{
      setCode(defaultCodes[language]);
      },[language])
      const handleSubmit=async()=>{
        const payload={
          language,
          code,
        }
        try{
          setOutput('Loading...');
          const data=await submit(payload,id);
          console.log(data.output.message);
          if(data.output.message=='Accepted')setOutput(data.output.message )
          else setOutput(`${data.output.message}\ninput : ${data.output.testcase}\nyour output : ${data.output.your_output}\nexpected output : ${data.output.expected_output}`)
        }catch(err){console.log(err)}
      }
    const handleRun = async () => {
      const payload = {
        language,
        code,
        input,
      };
  
      try {
        setOutput('Loading...')
              const data=await run(payload)
              console.log(payload);
              setOutput(data.output);
      } catch (error) {
        console.log(error.response);
      }
    };
    return (
      <div className="lg:w-1/2 lg:pl-8 pt-10">
        <div className=" flex flex-col lg:flex-col items-stretch">
          <div className="lg:w-full lg:pr-4 mb-4 lg:mb-0">
            <h1 className="text-3xl font-bold mb-3">
              AlgoU Online Code Compiler
            </h1>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="select-box border border-gray-500 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500"
            >
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="py">Python</option>
              <option value="java">Java</option>
            </select>
            <div
              className="bg-grey-100 shadow-md w-full  mb-1"
              style={{ height: "300px", overflowY: "auto" }}
            >
              <Editor
                value={code}
                onValueChange={(code) => setCode(code)}
                highlight={(code) => highlight(code, languages.js)}
                padding={10}
                style={{
                  fontFamily: '"Fira code", "Fira Mono", monospace',
                  fontSize: 12,
                  outline: "none",
                  border: "1px solid gray",
                  backgroundColor: "#f7fafc",
                  height: "100%",
                  overflowY: "auto",
                }}
              />
            </div>
            <div className="flex space-x-4">
              <button
                onClick={handleRun}
                type="button"
                className="w-1/4 text-center mt-4 border border-gray-500 bg-gray-200 hover:bg-gradient-to-br from-blue-500 to-green-400 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Run
              </button>
              <button
                onClick={handleSubmit}
                type="button"
                className="w-1/4 text-center mt-4 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5"
              >
                Submit
              </button>
            </div>
          </div>
          <div className="lg:w-full lg:pl-2 pt-3">
            {/* Input textarea */}
            <div className="mb-1">
              <h2 className="text-lg font-semibold mb-1">Input</h2>
              <textarea
                rows="5"
                cols="15"
                value={input}
                placeholder="Input"
                onChange={(e) => setInput(e.target.value)}
                className="border border-gray-500 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
                style={{ minHeight: "100px" }}
              ></textarea>
            </div>
  
            {/* Output box */}
            {
              <div >
                <h2 className="text-lg font-semibold mb-1">Output</h2>
                <div className="bg-gray-200 border border-gray-500 rounded-sm shadow-md p-4 h-28"
                  style={{
                    fontFamily: '"Fira code", "Fira Mono", monospace',
                    fontSize: 12,
                  }}
                >
                  {output}
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    );
  };