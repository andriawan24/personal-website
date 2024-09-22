import BlogItem from "@/components/blog-item";
import Pill from "@/components/views/pill";
import { allBlogs } from "contentlayer/generated";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function RecentBlogs() {
  const blogs = allBlogs.slice(0, 3);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      {blogs.map((blog) => (
        <BlogItem blog={blog} key={blog._id} />
      ))}
    </div>
  );
}
