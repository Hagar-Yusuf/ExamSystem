export interface TrueFalseQuestion {
  trueFalse_ID: number;   
  body: string;
  mark: number;
  correctAnswer: boolean;
  option1: string;
  option2: string;
  exam_ID: number;
}

export type CreateTrueFalseQuestionDto = Omit<TrueFalseQuestion, 'trueFalse_ID'>;
