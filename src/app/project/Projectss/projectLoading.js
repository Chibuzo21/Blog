export default function ProjectLoading() {
  // we gave our json-server a delay of 5s in our package.json so that our data fetching is not instant
  // the purpose of loading.js is to have something to display like a suspense or distraction before the data fetched dispalys in the ui
  //   this also helps that you can navigate to other pages while the project page which is where data is to be displayed is still trying to fetch data
  // unlike before where every page is on hold till the data is fetched
  return (
    <div className=" h-[80vh] text-white dark:text-gray-800">
      <h1 className="text-gray-300 text-3xl text-center mb-8">JSON-SERVER</h1>
      <ul className="space-y-8">
        {Array(3)
          .fill(0)
          .map((_el, index) => (
            // Array(3).fill(0) creates an array of 3 elements where all the elements are 0
            // the underscore in _el suggests that the parameter is not compulsorily used
            <li key={index}>
              <div className="bg-neutral-100 animate-pulse dark:bg-neutral-700 w-full h-24 "></div>
            </li>
          ))}
      </ul>
    </div>
  );
}
