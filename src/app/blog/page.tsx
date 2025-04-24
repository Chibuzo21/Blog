import Link from "next/link";
import { getPosts } from "../../../lib/posts";
import Pagination from "@/components/pagination";
import H1 from "@/components/h1";

type SearchParams = Promise<{
  tags?: string;
  page: number;
  order: string;
  limit: number;
}>;
export default async function BlogPostsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { tags } = await searchParams;
  // searchParams objects which is passed as a prop here comes from the App router in nextjs, it contains query parameters from the URL. eg if URL is /blog?tags=javascript,typescript&page=2 then searchParams={tags:"javascript,typescript",page:"2"}. it represents everything that comes after the question mark known as query parameters or query strings. it contains key value pairs

  const tagsArray = tags?.split(",");
  // split is a string method that converts a string into an array of substrings based on a specific separator(the comma in this case)
  // the above states that if tags exists then convert it from a string to an array but if tags doesn't exist then tagArray will equal an empty array
  const order = (await searchParams).order ?? "newest";
  const page = (await searchParams).page ?? 1;
  const limit = (await searchParams).limit ?? 3;
  const { posts, Pagecount } = await getPosts({
    tags: tagsArray,
    newest: order === "newest",
    page,
    limit,
  });
  return (
    <>
      <H1>Recent Posts</H1>
      <div className="text-lg text-gray-600 dark:text-gray-400 mb-8">
        Stay up to date with most recent posts
      </div>
      <hr />
      <div className="mb-8">
        Display&nbsp;
        {order === "newest" && (
          <Link href="/blog?order=oldest" className="underline">
            oldest
          </Link>
        )}
        {order === "oldest" && (
          <Link href="/blog?order=newest" className="underline">
            newest
          </Link>
        )}
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-2xl font-semibold text-gray-800 dark:text-gray-200"
            >
              {post.frontmatter.title}
            </Link>

            <div className="text-sm text-gray-400">{post.frontmatter.date}</div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <Pagination PageCount={Pagecount} />
      </div>
    </>
  );
}
