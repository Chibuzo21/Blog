import type { MDXComponents } from "mdx/types";
import H1 from "./components/h1";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: (props) => <H1 {...props} />,
    // This components helps us to customize elements or tags we use in our mdx, here we are replacing the h1 tag with H1 component that we just created
    ...components,
  };
}
