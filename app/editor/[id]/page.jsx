"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { createPost } from "@/lib/posts";
import { supabase } from "@/lib/supabase";
import { cn } from "@/lib/utils";

// 마크다운 에디터를 동적으로 임포트
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

const categories = [
  { id: "concepts", name: "물리학 개념" },
  { id: "problems", name: "기출 풀이" },
  { id: "community", name: "커뮤니티" },
];

export default function EditorPage({ params }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSave = async () => {
    if (!title || !content || !category) {
      setError("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // 현재 로그인한 사용자 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("로그인이 필요합니다.");
        return;
      }

      // 게시글 저장
      await createPost({
        title,
        content,
        category,
        userId: user.id,
      });

      // 저장 성공 후 해당 카테고리 페이지로 이동
      router.push(`/${category}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-6">
        <input
          type="text"
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 text-2xl font-bold border-b border-gray-200 focus:outline-none focus:border-blue-500"
        />
      </div>

      <div className="mb-6">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        >
          <option value="">카테고리 선택</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div data-color-mode="light">
        <MDEditor
          value={content}
          onChange={setContent}
          preview="edit"
          height={500}
          className="w-full"
        />
      </div>

      <div className="mt-6 flex justify-end space-x-4">
        <button
          onClick={() => router.back()}
          className="px-4 py-2 text-gray-600 hover:text-gray-800"
          disabled={isLoading}
        >
          취소
        </button>
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={cn(
            "px-4 py-2 bg-blue-500 text-white rounded-lg",
            "hover:bg-blue-600 disabled:bg-blue-300",
            "flex items-center"
          )}
        >
          {isLoading ? (
            <>
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              저장 중...
            </>
          ) : (
            "저장하기"
          )}
        </button>
      </div>
    </div>
  );
}
