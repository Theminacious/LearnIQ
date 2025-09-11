"use client";
import { ApiDeepDiveResponse } from "@/app/api/deep-dive";
import { useState } from "react";

export const useGetQuestionDeepDive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [markdown, setMarkdown] = useState<string | null>(null);

  const handleClearDeepDive = () => {
    setMarkdown(null);
    setError(false);
    setIsLoading(false);
  };

  const handleGetQuestionDeepDive = async ({
    question,
  }: {
    question: string;
  }) => {
    try {
      setIsLoading(true);

      const response = await fetch("/api/deep-dive", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question,
        }),
      });

      const data = (await response.json()) as ApiDeepDiveResponse;

      if (!data || !data.data) {
        setError(true);
        setIsLoading(false);
        return null;
      }

      setMarkdown(data.data.markdown);
      setIsLoading(false);
      return data.data.markdown;
    } catch {
      setError(true);
      setIsLoading(false);
      return null;
    }
  };

  return {
    isLoading,
    handleGetQuestionDeepDive,
    error,
    markdown,
    handleClearDeepDive,
  };
};
