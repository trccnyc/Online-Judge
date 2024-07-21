import { useState,useEffect } from "react";
import { fetchproblem } from "../services/fetchproblem";
import { Description } from "../components/Description";
import axios from "axios";
import { Button } from "./Button";

export const Render_problem = ({id}) => {
    const [problem, setProblem] = useState({
      title: "Loading...",
      description: 'Loading...',
      output_format: 'Loading...',
      examples: [
        { input: "Loading...", output: "Loading..." },
      ],
      limits :{
        time: "Loading...",
        space: "Loading...",
      }
    });
    useEffect(()=>{
      fetchData()
    }, [id])
      
      const fetchData = async () => {
      const response = await fetchproblem(id);
      setProblem(response.problem)
      }
    return (
      <div className="lg:w-1/2 lg:pr-4 mb-4 lg:mb-0 lg:pl-8 pt-10">
        <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
        <Description description={problem.description}>Description</Description>
        <Description description={problem.input_format}>Input Format</Description>
        <Description description={problem.output_format}>Output Format</Description>
        <Description description={problem.constraints}>Constraints</Description>
        <p className="text-xl font-semibold mb-2">Examples </p>
        {problem.examples.map((example) => (
          <div key={example._id} className="mb-4">
            <p className="ml-2">Input: {example.input}</p>
            <p className="ml-2">Output: {example.output}</p>
          </div>
        ))}
        <p className="text-xl font-semibold mb-2">Limits</p>
        <p>Time : {problem.limits.time}s</p>
        <p className="text mb-4">Space : {problem.limits.space}MB</p>
      </div>
    );
  };