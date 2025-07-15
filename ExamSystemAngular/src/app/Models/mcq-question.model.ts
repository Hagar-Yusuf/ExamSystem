export interface MCQQuestion {
  question_ID: number;
  body: string;
  mark: number;
  correctAnswer: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  exam_ID: number;
}

export type CreateMcqQuestionDto = Omit<MCQQuestion, 'question_ID'>;
