import type { IQuiz } from "@/store/useGlobalStore";

type GetQuizScoreInput = {
  quiz: IQuiz;
};

export function getQuizScore({ quiz }: GetQuizScoreInput) {
  const correctAnswers = quiz.questions.filter((question) => {
    const correctAnswer = question.answers.find((answer) => answer.isCorrect)?.text;

    return Boolean(correctAnswer && question.userSelection === correctAnswer);
  });

  const percent =
    quiz.questions.length === 0
      ? 0
      : Math.round((correctAnswers.length / quiz.questions.length) * 100);

  return {
    correctAnswers,
    percent,
  };
}