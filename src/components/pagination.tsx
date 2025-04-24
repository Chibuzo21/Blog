"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { usePathname } from "next/navigation";
export default function Pagination({ PageCount }: { PageCount: number }) {
  const searchParams = useSearchParams();
  // useSearchParams is a Client Component hook that lets you read the current URL's search parameter
  const pages = [];
  const page = Number(searchParams.get("page") ?? 1);
  for (let i = 1; i <= PageCount; i++) {
    pages.push(i);
  }
  const pathName = usePathname();
  // A Client Component hook that lets you read the current URL's pathname.
  console.log(pages);
  return (
    <>
      <ul className="flex text-lg justify-center space-x-4 font-mono">
        {pages.map((pageNumber) => {
          const params = new URLSearchParams(searchParams);
          // URLsearchParams allows you to interfere and manipulate query parameters which is those key-value pairs that comes from "?" in the url search eg https://www.x.com?name=John&age=30
          // The name and age property which comes after the ? above are called the query parameters
          // while useSearch helps you get the current url, urlsearchParams helps you manipulate its query parameters.
          //params here is a new instanace of the pre-existing blog url containing all of its query parameters
          params.set("page", pageNumber.toString());
          // here instead of changing the url to /blog/page=Pagenumber, this will remove all other query params and set the page to default rendring the oldest and newest order ineffective. To avoid that we target only the query parameter 'page' and use set method which is being provided by the URLsearchparams to mutate its value while retaining the state of other query parameters.
          console.log(params);
          return (
            <li key={pageNumber}>
              <Link
                href={`${pathName}?${params.toString()}`}
                className={`${
                  pageNumber === page
                    ? " decoration-gray-400 underline-offset-4 underline decoration-4"
                    : ""
                }text-gray-500 dark:text-gray-400`}
              >
                {pageNumber}
              </Link>
              {/* by using params here, we are running the instance of the blog url's query paramaters including the new value for page made with set method, and also converting this to a string  */}
            </li>
          );
        })}
      </ul>
    </>
  );
}
