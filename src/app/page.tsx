import H1 from "@/components/h1";

import Link from "next/link";
import { getPosts } from "../../lib/posts";

// interface Post {
//   id: number;
//   title: string;
//   body: string;
// }
// This is an interface that represents what our data should be like
// const fetchPosts = async (): Promise<Post[]> => {
//   const res = await fetch("https://jsonplaceholder.typicode.com/users/1/posts");
//   if (!res.ok) {
//     console.log("could not fetch posts");
//   }
//   return res.json();
// };
export default async function Home() {
  // const posts = await fetchPosts();
  const { posts } = await getPosts({ newest: true, limit: 3 });
  console.log(posts);
  return (
    <main className="mb-8">
      {/* {posts.map((post) => (
        <Postman key={post.id} post={post} />
      ))} */}
      <H1>Welcome to my page</H1>
      <p>My name is Chibuzo, I am a developer</p>
      <p>
        Checkout my{" "}
        <Link href="/photos" className="underline">
          Photos
        </Link>
        ,{" "}
        <Link href="/project" className="underline">
          Projects
        </Link>{" "}
        and{" "}
        <Link className="underline" href="/blog">
          Blog
        </Link>
      </p>
      {/* <Section>This is the section</Section> */}
      <section>
        <h2 className="text-lg mb-8">Latest on the blog</h2>
        <ul className="font-mono space-y-3">
          {posts.map((post) => (
            <li key={post.slug}>
              <span className="dark:text-gray-400 text-gray-600">
                {post.frontmatter.date} &nbsp;
              </span>
              <Link className="underline" href={`/blog/${post.slug}`}>
                {post.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
