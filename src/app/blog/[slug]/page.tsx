import { getPost as getPostNotCached, getPosts } from "../../../../lib/posts";
// here we import our getPost fn from post.ts and then rename it to getPostNotCached,
import { cache } from "react";
import Link from "next/link";

const getPost = cache(async (slug: string) => await getPostNotCached(slug));
// getPostNotCached represents the version that has not been cached and getPost fn above is the cached version used in this code. This is to prevent constant refetching of data, data gotten could be stored and reused later.
// getPost is as a function variable
type Params = Promise<{
  slug: string;
}>;
export async function generateStaticParams() {
  const { posts } = await getPosts({ limit: 1000 });
  // getPosts returns an object with properties post(an array of objects with frontmatter property and slug property) and Pagecount. by giving it a limit of 1000, it means the endindex will be 1000
  const params = posts.map((post) => ({
    slug: post.slug,
  }));
  return params;
  // we are simply saying all these slug posts returned by the map should be made static pages by the generateStaticParams function
}
export async function generateMetadata({ params }: { params: Params }) {
  try {
    const { slug } = await params;
    const { frontmatter } = await getPost(slug);

    return frontmatter;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to generate Metadata"
    );
    //  instanceof Error checks if an object is an instance of the built-in Error class because error can be anything
  }
}

async function BlogPage({ params }: { params: Params }) {
  const { slug } = await params;

  // if (!["first", "second"].includes(slug)) {
  //   return (
  //     <div>
  //       <h1>Not found</h1>
  //     </div>
  //   );
  // }
  let markdown;
  try {
    markdown = await getPost(slug);
  } catch (error) {
    console.error(error);
    return (
      <div>
        <h1>Not found</h1>
      </div>
    );
  }
  return (
    <div className=" prose  dark:prose-invert h-screen ">
      {/* <MDXRemote source={markdown} /> */}
      {/* No need to use the above again, since getPost a function that generates the frontmatter outside the mdx has been called, i can do this which is below instead. where content represents the mdx and frontmatter represents the metadata. eg frontmatter.title */}
      <div className="flex space-x-2 mb-8">
        {markdown.frontmatter.tags.map((tag) => (
          <Link
            key={tag}
            className="dark:text-gray-400 text-gray-500"
            href={`/blog/?tags=${tag}`}
          >
            #{tag}
          </Link>
        ))}
      </div>
      {markdown.content}
    </div>
  );
}
export default BlogPage;
