using System.Text.Json.Serialization;

namespace ExamSystem.DTOs
{
    public class SubmitExamDto
    {
        public int ExamId { get; set; }
        public List<AnswerDto> Answers { get; set; }

        [JsonIgnore]
        public int StudentId { get; set; }
    }
}
