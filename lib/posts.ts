import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogDir = path.join(process.cwd(), "content/blog");

export function getAllPosts() {
  const files = fs.readdirSync(blogDir);

  return files.map((file) => {
    const filePath = path.join(blogDir, file);
    const content = fs.readFileSync(filePath, "utf8");
    const { data, content: body } = matter(content);

    return {
      slug: file.replace(".md", ""),
      ...data,
      body,
    };
  });
}
