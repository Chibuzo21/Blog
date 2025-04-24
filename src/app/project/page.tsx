import { Suspense } from "react";
import ProjectList from "./Projectss/projectList";
import ProjectLoading from "./Projectss/projectLoading";
// import { ErrorBoundary } from "react-error-boundary";
export const metadata = {
  title: "Project",
  // This will update the title of the project page
};

export default async function Project() {
  return (
    <div className=" h-[100vh] p-4 ">
      <h1 className="dark:text-gray-300 text-gray-800 mb-8 text-3xl">
        Project
      </h1>
      {/* suspense is used in place of loading.js while loading affects the entire page, suspsense only affects a particular section */}
      <div className="dark:text-white  text-gray-800">
        {/* Error boundary is used to set an error message that will display whenever we have an error in our code, by wrapping it ensures that other parts of your code are still active that is only that section that has error will be affected unlike in error.js where the entire page is swapped with the error message. ErrOr boundary displaces error.js */}
        {/* <ErrorBoundary fallback={<div>Cannot fetch project's currently </div>}> */}
        <Suspense fallback={<ProjectLoading />}>
          <ProjectList />
        </Suspense>
        {/* </ErrorBoundary> */}
        {/* fall back is simply the message that will replace the wrapped component  */}
      </div>
    </div>
  );
}
