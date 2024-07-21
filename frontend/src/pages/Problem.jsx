import { Render_problem } from "../components/Problem_Description";
import { useSearchParams } from "react-router-dom";
import { Render_compiler } from "../components/Compiler";

const Problem = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const contestID=searchParams.get('contestID');
  return (
    <>
      <div className="mx-8  flex flex-col lg:flex-row items-stretch">
        <Render_problem id={id} ></Render_problem>
        <Render_compiler id={id} contestID={contestID}></Render_compiler>
      </div>
    </>
  );
};

export default Problem;
