namespace ExamSystem.DTOs
{
    public enum QuestionType
    {
        MCQ,
        TrueFalse
    }
    public class QuestionAddDto
    {
        public QuestionType Type { get; set; }  // Which type of question

        public string Body { get; set; }
        public int Mark { get; set; }
        public int? Exam_ID { get; set; }

        // MCQ-specific
        public string Option1 { get; set; }
        public string Option2 { get; set; }
        public string Option3 { get; set; }
        public string Option4 { get; set; }

        // MCQ correct answer (string)
        public string CorrectAnswer { get; set; }

        // True/False correct answer (bool)
        public bool? CorrectAnswerBool { get; set; }
    }
}
