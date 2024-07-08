import { useState } from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";
import axios from "axios";

const Problem = () => {
  return (<>
    <div className="mx-8  flex flex-col lg:flex-row items-stretch">
      <Render_problem></Render_problem>
      <Render_compiler></Render_compiler>
    </div>
    </>
  );
};
const Render_compiler = () => {
  const [code, setCode] = useState(`
        #include <iostream> 
        using namespace std;
        int main() { 
            // Declare variables
            int num1, num2, sum;
            // Prompt user for input
            cin >> num1 >> num2;  
            // Calculate the sum
            sum = num1 + num2;  
            // Output the result
            cout << "The sum of the two numbers is: " << sum;  
            // Return 0 to indicate successful execution
            return 0;  
        }  
            `);
  const [language, setLanguage] = useState("cpp");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const handleSubmit = async () => {
    const payload = {
      language,
      code,
      input,
      token:localStorage.token
    };

    try {
      const { data } = await axios.post(
        "http://localhost:3000/compiler/run",
        payload
      ,{withCredentials:true});
      console.log(data);
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
            className="bg-grey-100 shadow-md w-full  mb-4"
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
              onClick={handleSubmit}
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
        <div className="lg:w-full lg:pl-2 pt-10">
          {/* Input textarea */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Input</h2>
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
            <div className="bg-gray-200 border border-gray-500 rounded-sm shadow-md p-4 h-28">
              <h2 className="text-lg font-semibold mb-2">Output</h2>
              <div
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
const Render_problem = () => {
  const [problem, setProblem] = useState({
    title: "Sphinx and Range Sums",
    description: `Use Fast Input/Output in this Question 
    
    The Sphinx has presented you with N numbers. The i-th number is ni. The sphinx now asks you Questions. The j-th question specifies two integers ljand rj. You must answer with the sum of integers in the range [lj,rj]. That is the sum of all ni where lj≤i≤rj.`,
    input_format: `One integer N on the first line.
    N integers on the second line. The i-th integer is ni.
    One integer Q on the third line.
    Q lines follow. The j-th of these lines has two integers lj rj.`,
    output_format: `Q lines with one answer on each --- the answer to the j-th query on the j-th line.`,
    constraint: `1≤N,Q≤10^6
    1≤ni≤10^6
    1≤li≤ri≤N`,
    Examples: [
      { input: "5 4", output: "9" },
      { input: "50 41", output: "91" },
    ],
    timeL_limit: "2",
    space_limit: "2",
  });
  return (
    <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0 lg:pl-8 pt-10">
      <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
      <p className="text-xl font-semibold mb-2">Description</p>
      <p className="mb-4 whitespace-pre-line">{problem.description}</p>
      <p className="text-xl font-semibold mb-2">Input Format </p>
      <p className="mb-4 whitespace-pre-line">{problem.input_format}</p>
      <p className="text-xl font-semibold mb-2">Output Format </p>
      <p className="mb-4 whitespace-pre-line">{problem.output_format}</p>
      <p className="text-xl font-semibold mb-2">Constraints</p>
      <p className="mb-4 whitespace-pre-line">{problem.constraint}</p>
      <p className="text-xl font-semibold mb-2">Examples </p>
      {problem.Examples.map((example, index) => (
        <div key={index} className="mb-4">
          <p className="ml-2">Input: {example.input}</p>
          <p className="ml-2">Output: {example.output}</p>
        </div>
      ))}
      <p className="text-xl font-semibold mb-2">Limits</p>
      <p>Time : {problem.timeL_limit}s</p>
      <p className="text mb-4">Space : {problem.space_limit}MB</p>
    </div>
  );
};
export default Problem;
