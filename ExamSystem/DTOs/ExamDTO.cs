using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using System.ComponentModel.DataAnnotations;

namespace ExamSystem.DTOs
{
    public class ExamDto
    {
        public int Exam_ID { get; set; }
        [Required(ErrorMessage = "Title is required.")]
        [StringLength(30,ErrorMessage = "Title must be 30 characters or less.")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Description is required.")]
        [StringLength(200, ErrorMessage = "Description must be 200 characters or less.")]
        public string Description { get; set; }

        [Required(ErrorMessage = "Duration is required.")]
        [Range(1, int.MaxValue, ErrorMessage = "Duration must be at least 1 minute.")]
        public int? Duration { get; set; }
        [ValidateNever]
        public List<QuestionDto>? Questions { get; set; }



    }
}
