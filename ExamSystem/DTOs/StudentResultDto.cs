    namespace ExamSystem.DTOs
    {
    public class StudentResultDto
    {
        public int Result_ID { get; set; }
        public int Exam_ID { get; set; }
        public string ExamTitle { get; set; }
        public int User_ID { get; set; }
        public string StudentName { get; set; }
        public double Score { get; set; }
    }
}
