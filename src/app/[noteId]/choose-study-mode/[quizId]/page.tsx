"use client";

import { AnswerSelector } from "@/components/AnswerSelector/page";
import { MainLayout } from "@/components/Layouts/MainLayout/page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetQuestions } from "@/hooks/useGetQuestions";
import useGlobalStore from "@/store/useGlobalStore";
import { CircleX } from "lucide-react";

export default function TestPage({
  params,
}: {
  params: { noteId: string; quizId: string };
}) {
  const { notes } = useGlobalStore();
  const { isLoading, quiz, error } = useGetQuestions({
    noteId: params.noteId,
    quizId: params.quizId,
  });

  // ✅ Safely get updated quiz from localStorage (notes state)
  const localStorageUpdatedQuiz = notes.length
    ? notes
        .find((note) => note.id === quiz?.noteId)
        ?.quizzes?.find((q) => q.id === quiz?.id)
    : null;

  const renderQuestions = () => {
    if (isLoading) {
      return (
        <div>
          <div className="flex flex-col space-y-3">
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-full h-10" />
            <Skeleton className="w-[20%] h-10" />
          </div>

          <div className="flex flex-col space-y-5 mt-5 p-5">
            <Skeleton className="w-full h-20" />
            <Skeleton className="w-full h-20" />
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <Alert className="border-red-500 text-red-500">
          <CircleX className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            An error occurred while fetching the questions. Please try again later.
          </AlertDescription>
        </Alert>
      );
    }

    if (!quiz?.questions?.length) {
      return <p>⚠️ No questions found for this quiz.</p>;
    }

    if (!localStorageUpdatedQuiz) {
      return <p>⚠️ Could not sync quiz with local storage.</p>;
    }

    return (
      <div className="px-5 sm:px-10">
        <AnswerSelector quiz={localStorageUpdatedQuiz} />
      </div>
    );
  };

  return <MainLayout>{renderQuestions()}</MainLayout>;
}
