namespace ExamSystem.DTOs
{
    public class AnswerDto
    {
        public int? McqId { get; set; }
        public int? TrueFalseId { get; set; }
        public int? SelectedOption { get; set; }

        public int QuestionId { get; set; }
    }
}
