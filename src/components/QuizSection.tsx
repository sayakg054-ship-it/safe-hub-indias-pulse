import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Star, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { getDailyQuiz } from "@/lib/data";

export function QuizSection() {
  const questions = getDailyQuiz();
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[currentQ];
  const progress = ((currentQ + (answered ? 1 : 0)) / questions.length) * 100;

  function handleSelect(idx: number) {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    if (idx === q.correctAnswer) {
      setScore(s => s + q.points);
    }
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  }

  if (finished) {
    return (
      <Card className="border-0 shadow-lg">
        <CardContent className="p-8 text-center">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 mb-4">
            <Trophy className="h-10 w-10 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">Quiz Complete!</h3>
          <p className="text-muted-foreground mb-4">
            You scored <span className="font-bold text-primary">{score}</span> out of {questions.length * 10} points
          </p>
          <div className="flex items-center justify-center gap-1 mb-6">
            {Array.from({ length: 5 }, (_, i) => (
              <Star
                key={i}
                className={`h-6 w-6 ${i < Math.ceil(score / 10) ? 'text-warning fill-warning' : 'text-muted'}`}
              />
            ))}
          </div>
          <Button
            onClick={() => { setCurrentQ(0); setScore(0); setSelected(null); setAnswered(false); setFinished(false); }}
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Star className="h-5 w-5 text-warning" /> Daily Health Quiz
          </CardTitle>
          <Badge variant="secondary" className="gap-1">
            <Trophy className="h-3 w-3" /> {score} pts
          </Badge>
        </div>
        <Progress value={progress} className="mt-2" />
        <p className="text-xs text-muted-foreground mt-1">
          Question {currentQ + 1} of {questions.length}
        </p>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="font-medium text-foreground mb-4">{q.question}</p>
        <div className="space-y-2">
          {q.options.map((opt, idx) => {
            let optStyle = "border-border bg-background hover:bg-accent";
            if (answered && idx === q.correctAnswer) {
              optStyle = "border-success bg-success/10";
            } else if (answered && idx === selected && idx !== q.correctAnswer) {
              optStyle = "border-danger bg-danger/10";
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                className={`w-full text-left px-4 py-3 rounded-lg border text-sm transition-all ${optStyle} ${!answered ? 'cursor-pointer' : 'cursor-default'}`}
              >
                <div className="flex items-center justify-between">
                  <span>{opt}</span>
                  {answered && idx === q.correctAnswer && <CheckCircle className="h-4 w-4 text-success" />}
                  {answered && idx === selected && idx !== q.correctAnswer && <XCircle className="h-4 w-4 text-danger" />}
                </div>
              </button>
            );
          })}
        </div>
        {answered && (
          <div className="mt-4 p-3 rounded-lg bg-muted text-xs text-muted-foreground">
            💡 {q.explanation}
          </div>
        )}
        {answered && (
          <Button onClick={handleNext} className="mt-4 w-full gap-2">
            {currentQ < questions.length - 1 ? "Next Question" : "See Results"}
            <ArrowRight className="h-4 w-4" />
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
