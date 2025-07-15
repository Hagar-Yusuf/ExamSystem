namespace ExamSystem.DTOs
{
    public class QuestionDto
    {
        public int QuestionId { get; set; }
        public string Body { get; set; }
        public int? Mark { get; set; }
        public List<string> Options { get; set; }
        public string Type { get; set; } 
    }
}
