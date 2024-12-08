"use client";

import { useEffect, useState } from "react";
import { getPosts } from "@/lib/posts";
import Link from "next/link";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

const categoryNames = {
  concepts: "물리학 개념",
  problems: "기출 풀이",
  community: "커뮤니티",
};

export default function CategoryPage({ params }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setIsLoading(true);
        const { posts } = await getPosts({ category: params.category });
        setPosts(posts);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadPosts();
  }, [params.category]);

  if (error) {
    return <div className="p-4 text-red-600">에러가 발생했습니다: {error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">
          {categoryNames[params.category] || "게시글 목록"}
        </h1>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-md p-6 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/post/${post.id}`}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {post.content.replace(/[#*`]/g, "")}
              </p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.users?.name || "익명"}</span>
                <span>
                  {format(new Date(post.created_at), "PPP", { locale: ko })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
