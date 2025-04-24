// Here we can store all our interfaces globally so that any file can make use of it without imorting it
interface Post {
  id: number;
  title: string;
  body: string;
}
interface Params {
  slug: string;
}
// type SectionProps = {
//   title?: string;
//   children: ReactNode;
// };
