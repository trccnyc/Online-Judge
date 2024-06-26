export function Problems({ problems }) {
  return (
    <div>
      {problems.map((problem) => {
        {console.log(problem)};
        return (
          <div>
            <a href='/Login'><h2 style={{ border: '2px solid black' }}>{problem.Title}</h2></a>
          </div>
        );
      })}
    </div>
  );
}
