using ExamSystem.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ExamSystem.DTOs
{
    public class McqDTO
    {
        public int MCQ_ID { get; set; }

        [Required(ErrorMessage = "Body is required.")]
        [StringLength(500, ErrorMessage = "Body cannot exceed 500 characters.")]
        public string Body { get; set; }

        [Range(1, int.MaxValue, ErrorMessage = "Mark must be a positive number.")]
        public int? Mark { get; set; }

        [Required(ErrorMessage = "CorrectAnswer is required.")]
        [Range(1, 4, ErrorMessage = "CorrectAnswer must be between 1 and 4.")]
        public int? CorrectAnswer { get; set; }

        [Required(ErrorMessage = "Option1 is required.")]
        [StringLength(100, ErrorMessage = "Option1 cannot exceed 100 characters.")]
        public string Option1 { get; set; }

        [Required(ErrorMessage = "Option2 is required.")]
        [StringLength(100, ErrorMessage = "Option2 cannot exceed 100 characters.")]
        public string Option2 { get; set; }

        [Required(ErrorMessage = "Option3 is required.")]
        [StringLength(100, ErrorMessage = "Option3 cannot exceed 100 characters.")]
        public string Option3 { get; set; }

        [Required(ErrorMessage = "Option4 is required.")]
        [StringLength(100, ErrorMessage = "Option4 cannot exceed 100 characters.")]
        public string Option4 { get; set; }

        [Required(ErrorMessage = "Exam_ID is required.")]
        public int? Exam_ID { get; set; }

    }
}
