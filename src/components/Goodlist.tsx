import { useState, useEffect } from "react";
import PreviewIframe from "./iframe";
import styles from "./Goodlist.module.css";
import { Content } from "next/font/google";
import { set } from "firebase/database";

type Post = {
  id: string;
  title: string;
  height: number;
  width: number;
  html: string;
  css: string;
  author: string;
  authorId: string;
  tags: string[];
};

const goods: Post[] = [
  {
    id: "1",
    title: "Simple Square",
    height: 300,
    width: 300,
    html: `<div class="square"></div>`,
    css: `.square { width: 100%; height: 100%; background-color: #3498db; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["square", "blue", "simple"],
  },
  {
    id: "2",
    title: "Red Circle",
    height: 100,
    width: 100,
    html: `<div class="circle red"></div>`,
    css: `.circle.red { width: 100%; height: 100%; border-radius: 50%; background-color: #e74c3c; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["circle", "red", "simple"],
  },
  {
    id: "3",
    title: "Green Rectangle",
    height: 150,
    width: 250,
    html: `<div class="rectangle green"></div>`,
    css: `.rectangle.green { width: 100%; height: 100%; background-color: #2ecc71; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["rectangle", "green", "simple"],
  },
  {
    id: "4",
    title: "Blue Triangle",
    height: 200,
    width: 200,
    html: `<div class="triangle blue"></div>`,
    css: `.triangle.blue { width: 0; height: 0; border-left: 100px solid transparent; border-right: 100px solid transparent; border-bottom: 200px solid #3498db; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["triangle", "blue", "simple"],
  },
  {
    id: "5",
    title: "Yellow Ellipse",
    height: 300,
    width: 400,
    html: `<div class="ellipse yellow"></div>`,
    css: `.ellipse.yellow { width: 100%; height: 100%; border-radius: 50% / 25%; background-color: #f1c40f; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["ellipse", "yellow", "simple"],
  },
  {
    id: "6",
    title: "Purple Polygon",
    height: 500,
    width: 500,
    html: `<div class="polygon purple"></div>`,
    css: `.polygon.purple { width: 100%; height: 100%; clip-path: polygon(50% 0%, 0% 100%, 100% 100%); background-color: #9b59b6; }`,
    author: "Author Name",
    authorId: "author-id",
    tags: ["polygon", "purple", "simple"],
  },
];

type Props = {
  Post: Post[];
};

//Postを受け取り、それを表示するコンポーネント
export const PostList: React.FC<Props> = ({ Post }) => {
  const [goodPosts, setGoodPosts] = useState<Post[]>([]);

  useEffect(() => {
    setGoodPosts(Post);
  }, [Post]);

  return (
    <div>
      <div className={styles.posts}>
        {goodPosts.map((good, index) => {
          return (
            <div key={index} className={styles.goodPost}>
              <PreviewIframe Post={good} />
            </div>
          );
        })}
      </div>
    </div>
  );
};
