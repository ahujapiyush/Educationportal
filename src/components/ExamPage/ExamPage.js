import { useState } from "react";
import Stats from "./stats";
import EndScreen from "./end-screen";
import TriviaItem from "./trivia-item";
import { FadeTransition, FadeWrapper } from "./fade-transition";
import StartScreen from "./start-screen";

function ExamPage({ examdata }) {
  const [examState, setExamState] = useState({
    score: 0,
    index: 0,
    state: "start",
    startTime: performance.now(),
  });

  const question = examdata.question;
  const { score, index, state, startTime } = examState;
  const questionNumber = index + 1;
  const numQuestions = question.length ?? [];
  const playTimeInSeconds = (performance.now() - startTime) / 1000;

  const restartExam = () => {
    setExamState({
      score: 0,
      index: 0,
      state: "start",
      startTime: performance.now(),
    });
  };

  const onStart = () => {
    setExamState({
      score: 0,
      index: 0,
      state: "running",
      startTime: performance.now(),
    });
  };

  const loadNextQuestion = () => {
    if (index >= question.length - 1) {
      setExamState({ ...examState, state: "end" });
    } else {
      // Using the spread operator to copy the gameState and override the triviaIndex.
      setExamState({
        ...examState,
        state: "running",
        triviaIndex: index + 1,
      });
    }
  };

  const onAnswerSelected = (wasPlayerCorrect) => {
    if (wasPlayerCorrect) {
      setExamState({
        ...examState,
        score: score + 1,
      });
    }
  };

  let pageContent;
  let pageKey;
  if (state === "start") {
    pageKey = "QuizDetails";
    pageContent = <StartScreen quizData={examdata} onPlayClick={onStart} />;
  } else if (state === "end") {
    pageKey = "EndScreen";
    pageContent = (
      <EndScreen
        score={score}
        bestScore={0}
        onRetryClick={restartExam}
        playTime={playTimeInSeconds}
      />
    );
  } else {
    pageKey = index;
    const triviaQuestion = question[index];
    const { correctAnswer, incorrectAnswers, question } = triviaQuestion;
    pageContent = (
      <TriviaItem
        key={index}
        question={question}
        correctAnswer={correctAnswer}
        incorrectAnswers={incorrectAnswers}
        onNextClick={loadNextQuestion}
        onAnswerSelected={onAnswerSelected}
      />
    );
  }

  return (
    <>
      <Stats
        score={score}
        questionNumber={questionNumber}
        totalQuestions={numQuestions}
      />
      <FadeWrapper>
        <FadeTransition key={pageKey}>{pageContent}</FadeTransition>
      </FadeWrapper>
    </>
  );
}

export default ExamPage;
