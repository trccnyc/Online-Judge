import {useState} from 'react';
import Editor from 'react-simple-code-editor';
import {highlight,languages} from 'prismjs/components/prism-core';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism.css';
import axios from 'axios';


const Compiler = ()=>{
    const [code,setCode]=useState(`
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
        const [language,setLanguage]=useState('cpp')
        const [input, setInput] = useState('');
        const [output, setOutput] = useState('');
        const handleSubmit = async (e) => {
          e.preventDefault();
          const payload = {
            language,
            code,
            input,
          };
          try {
            const { data } = await axios.post('http://localhost:3000/compiler/run', payload,{withCredentials: true});
            console.log(data);
            setOutput(data.output);
          } catch (error) {
            console.log(error.response);
          }
        }
        return (
          <div>
            <div className="container mx-auto py-8 flex flex-col lg:flex-row items-stretch">
      {/* Left side: Compiler editor */}
      <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0">
        <h1 className="text-3xl font-bold mb-3">AlgoU Online Code Compiler</h1>
        <select value={language} onChange={(e)=> setLanguage(e.target.value)}
                className="select-box border border-gray-500 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500" >
                <option value='cpp'>C++</option>
                <option value='c'>C</option>
                <option value='py'>Python</option>
                <option value='java'>Java</option>
        </select>
        <div className="bg-grey-100 shadow-md w-full max-w-lg mb-4" style={{ height: '300px', overflowY: 'auto' }}>
          <Editor
            value={code}
            onValueChange={code => setCode(code)}
            highlight={code => highlight(code, languages.js)}
            padding={10}
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              outline: 'none',
              border: '1px solid gray',
              backgroundColor: '#f7fafc',
              height: '100%',
              overflowY: 'auto'
            }}
          />
        </div>

        {/* Run button */}
        <button onClick={handleSubmit} type="button" className="w-full text-center mt-4 bg-gradient-to-br from-blue-500 to-green-400 hover:from-blue-600 hover:to-green-500 focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5">
          Run
        </button>
      </div>

      {/* Right side: Input and Output */}
      <div className="lg:w-1/2 lg:pl-8 pt-10">
        {/* Input textarea */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2">Input</h2>
          <textarea
            rows='5'
            cols='15'
            value={input}
            placeholder='Input'
            onChange={(e) => setInput(e.target.value)}
            className="border border-gray-500 rounded-sm py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 resize-none w-full"
            style={{ minHeight: '100px' }}
          ></textarea>
        </div>

        {/* Output box */}
        {(
          <div className="bg-gray-200 border border-gray-500 rounded-sm shadow-md p-4 h-28">
            <h2 className="text-lg font-semibold mb-2">Output</h2>
            <div style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 12 }}>{output}</div>
          </div>
        )}
      </div>
    </div>
    </div>
  );
}
export default Compiler;