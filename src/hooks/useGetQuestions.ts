"use client";
import { ApiGetQuestionsType } from "@/app/api/get-questions";
import useGlobalStore, { IQuiz } from "@/store/useGlobalStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const useGetQuestions = () => {
  const { notes, updateQuiz } = useGlobalStore();
  const router = useRouter();

  // For App Router, use searchParams or pass noteId/quizId as props/context.
  // Here, you may need to adapt how you get noteId/quizId depending on your routing setup.
  // Example assumes you pass them via URL (searchParams) or context.

  // If using searchParams in a page/component:
  // const searchParams = useSearchParams();
  // const noteId = searchParams.get("noteId") ?? "";
  // const quizId = searchParams.get("quizId") ?? "";

  // For now, fallback to empty string if not available
  const noteId = (typeof window !== "undefined" && (router as any)?.query?.noteId) || "";
  const quizId = (typeof window !== "undefined" && (router as any)?.query?.quizId) || "";

  const [isLoading, setIsLoading] = useState(false);
  const [quiz, setQuiz] = useState<IQuiz | null>(null);
  const [error, setError] = useState(false);

  const handleGetQuestions = async (): Promise<IQuiz | null> => {
    const currentNote = notes.find((note) => note.id === noteId);
    const currentQuiz = currentNote?.quizzes.find((quiz) => quiz.id === quizId);

    if (currentQuiz?.questions && currentQuiz.questions.length > 0) {
      setIsLoading(false);
      return currentQuiz;
    }

    try {
      setIsLoading(true);

      if (!currentNote || !currentQuiz) {
        setError(true);
        setIsLoading(false);
        return null;
      }

      const response = await fetch("/api/get-questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userInput: currentNote.content,
          difficulty: currentQuiz.difficulty,
          questionAmount: currentQuiz.questionAmount,
          type: currentQuiz?.quizType,
        }),
      });

      const data = (await response.json()) as ApiGetQuestionsType;

      if (!data || !data.data) {
        setError(true);
        setIsLoading(false);
        return null;
      }

      const questions = data.data.questions;

      updateQuiz(noteId, quizId, {
        questions,
      });

      setIsLoading(false);
      return { ...currentQuiz, questions };
    } catch {
      setError(true);
      setIsLoading(false);
      return null;
    }
  };

  useEffect(() => {
    if (!noteId || !quizId) return;
    (async () => {
      const questionsResponse = await handleGetQuestions();
      setIsLoading(false);
      setQuiz(questionsResponse);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, quizId]);

  return { isLoading, quiz, handleGetQuestions, error };
};
