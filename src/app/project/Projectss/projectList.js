import { Card } from "../Card";
export default async function ProjectList() {
  const response = await fetch(
    "https://api.github.com/users/Chibuzo21/repos"
    // { next: { revalidate: 300 } },
    // revalidate is assigning your data to be fetched based on time at a regular interval for instance the example above our data will be refetched after 3 seconds of rendering
    // {
    //   cache: "no-store",
    // the cache :no-store is to prevent the browser from caching the data ie storing the fetched data temporarily and accessing the data direct from cache. instead of that we want it to access the data directly from the backend without storing cached data. Another alternative is by placing  export const dynamic ='force-dynamic' at the topmost of your code
    // }
  );
  const repos = await response.json();

  return (
    <div className=" grid grid-cols-1 md:grid-cols-2  gap-4">
      {repos.map((repo, index) => (
        <div key={index} className="mb-4 ">
          <Card className="font-mono h-full">
            <div className="flex justify-between mb-4">
              <div className="font-semibold">{repo.name}</div>
              <div>{repo.stargazers_count}</div>
            </div>
            <div>{repo.description}</div>
          </Card>
        </div>
      ))}
    </div>
  );
}
