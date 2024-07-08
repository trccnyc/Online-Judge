const Navbar=()=>{
    return (
        <nav className="bg-gradient-to-br from-blue-500 to-green-400 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white text-xl font-bold mr-8">ONLINE-JUDGE</div>
          <div className="flex space-x-4">
            <a href="/problemset" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Problemset
            </a>
            <a href="/compiler" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Compiler
            </a>
            <a href="/addproblem" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Add Problem
            </a>
            <a href="/problem" className="text-white px-4 py-2 rounded-md hover:bg-blue-500">
              Problem
            </a>
          </div>
        </div>
      </nav>
    );
  }
  export default Navbar;