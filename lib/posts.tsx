import fs from "fs";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import React from "react";
import H1 from "@/components/h1";
interface Frontmatter {
  title: string;
  description: string;
  date: number;
  tags: string[];
  // Add other frontmatter properties here (e.g., date, author)
}
type props = {
  newest?: boolean;
  limit?: number;
  page?: number;
  tags?: string[];
};
interface PostResult {
  frontmatter: Frontmatter;
  content: React.ReactNode;
  //  ReactNode is a type for returning JSX elements
}

export default function loadPosts(slug: string): string {
  const filename = slug.endsWith("mdx") ? slug : `${slug}.mdx`;
  const filepath = path.join(process.cwd(), "content", filename);
  // path.join joins arguments and returns them like a normal path

  return fs.readFileSync(
    // readFileSync returns the content of a path
    filepath,
    "utf-8"
    // utf-8 converts it to string
  );
}
// compileMdx allows us to access our frontmatter  outside the mdx, it has an option parseFrontMatter:true
export const getPost = async (slug: string): Promise<PostResult> => {
  const source = loadPosts(slug);
  try {
    const { frontmatter, content } = await compileMDX<Frontmatter>({
      source,
      components: {
        h1: (props) => <H1 {...props} />,
      },
      options: {
        parseFrontmatter: true,
      },
    });
    return {
      frontmatter,
      content,
    };
  } catch (error) {
    console.error(`Error compiling MDX for slug:${slug}`, error);
    throw new Error(`Failed to load post:${slug}`);
  }
};
export async function getPosts({
  newest = true,
  limit = 3,
  page = 1,
  tags,
}: // object destructuring was used here so instead of writing getPosts(params){ const limit=params.limit etc}, it is written as the above. also the parameters are all given default values except the property, "tags"
props) {
  const files = fs.readdirSync(path.join(process.cwd(), "content"));
  //   path.join
  //   readdirSync returns a list of files in a directory in an array format

  const posts = await Promise.all(
    files.map(async (filename) => {
      // Promise.all is a function that will only run when all the promises inside that function was resolved, if they were rejected, then it won't return any thing
      const { frontmatter } = await getPost(filename);
      // remember getPost returns the content and frontmatter property which is being provided by the compilerMdx present in the getPost function
      // where filename is a file in the content folder, because the slug in the getPost fn doesn't include.mdx(ie just first and not first.mdx) we have to edit the loadPost fn in the getPost fn

      return {
        frontmatter,
        slug: filename.replace(".mdx", ""),
        // replace method substitues the first occurance of a word (".mdx") with another("")
      };
    })
    // posts is an array of objects where each object returns properties: frontmatter and slug name
  );
  let filteredPosts = posts;
  if (tags) {
    filteredPosts = filteredPosts.filter(
      (post) => post.frontmatter.tags.some((tag) => tags.includes(tag))
      // some method checks if atleast one element in an array meets a condition
      // This is basically returning the post which the tag inputted matches the tag in that posts frontmatter tag
    );
  }

  if (newest) {
    // sort by newest
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);

      return dateB.getTime() - dateA.getTime();
    });
  } else {
    filteredPosts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);

      return dateA.getTime() - dateB.getTime();
      // the getTime function converts the date to milliseconds so that you can perform maths operations to the date
    });
  }
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  return {
    posts: filteredPosts.slice(startIndex, endIndex),
    Pagecount: Math.ceil(filteredPosts.length / limit),
    // Math.ceil rounds up a number to its nearest integer. eg 4.2= 5, 3.8=3, -2.3=-2
  };
  // The slice array method helps to extract items from a list, it extracts from the startIndex and stops at the index before the endIndex
  // This is what makes each page to only have 3 posts because of the slice method
}
