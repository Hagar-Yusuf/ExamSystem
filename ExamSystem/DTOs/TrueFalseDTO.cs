using System.ComponentModel.DataAnnotations;

namespace ExamSystem.DTOs
{
    public class TrueFalseDTO
    {
        public int TrueFalse_ID { get; set; }

        [Required(ErrorMessage = "Body is required.")]
        [StringLength(500, ErrorMessage = "Body cannot exceed 500 characters.")]
        public string Body { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Mark must be a non-negative number.")]
        public int? Mark { get; set; }

        [Required(ErrorMessage = "CorrectAnswer is required.")]
        [Range(1, 2, ErrorMessage = "CorrectAnswer must be 2 (False) or 1 (True).")]
        public int? CorrectAnswer { get; set; }

        [Required(ErrorMessage = "Option1 is required.")]
        [StringLength(10, ErrorMessage = "Option1 cannot exceed 10 characters.")]
        public string Option1 { get; set; }

        [Required(ErrorMessage = "Option2 is required.")]
        [StringLength(10, ErrorMessage = "Option2 cannot exceed 10 characters.")]
        public string Option2 { get; set; }

        [Required(ErrorMessage = "Exam_ID is required.")]
        public int? Exam_ID { get; set; }
    }
}