export function Problems({ problems }) {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-8">ProblemSet</h1>
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6">
      {problems.map((problem) => {
        {console.log(problem)};
        return (
          <div key={problem.id} className="bg-white shadow-lg rounded-lg p-1 hover:shadow-xl transition-shadow duration-300">
            <a href='/Login'><h2 className="text-xl font p-4 border-2 border-gray-500 rounded hover:bg-gray-700 transition duration-300">{problem.Title}</h2></a>
          </div>
        );
      })}
      </div>
    </div>
  );
}
