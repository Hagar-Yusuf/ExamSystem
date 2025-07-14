namespace ExamSystem.DTOs
{
    public class AvailableExamDto
    {
        public int Exam_ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int Duration { get; set; }
        public bool IsSubmitted { get; set; }
    }
}
