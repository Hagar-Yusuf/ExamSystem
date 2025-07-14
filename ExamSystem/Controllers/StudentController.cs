using ExamSystem.DTOs;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;

        public StudentController(IStudentService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = _service.Register(dto);
            return Ok(new { user.User_ID, user.Name, user.Email, user.Role });
        }

        [HttpGet("exams")]
        public IActionResult GetAvailableExams([FromQuery] int studentId)
        {
            var exams = _service.GetAvailableExamsForStudent(studentId);
            return Ok(exams);
        }

        [HttpGet("exams/{examId}")]
        public IActionResult GetExamWithQuestions(int examId, [FromQuery] int studentId)
        {
            var exam = _service.GetExamWithQuestions(examId, studentId);
            if (exam == null)
                return NotFound("Not authorized or exam not found.");

            return Ok(exam);
        }

        [HttpPost("exams/{examId}/start")]
        public IActionResult StartExam(int examId, [FromQuery] int studentId)
        {
            var exam = _service.StartExam(studentId, examId);
            if (exam == null)
                return NotFound("Exam not found.");
            return Ok(exam);

        }

        [HttpPost("exams/submit")]
        public IActionResult SubmitExam(SubmitExamDto dto)
        {
            var score = _service.SubmitExam(dto);
            return Ok(new { score });
        }

        [HttpGet("results")]
        public IActionResult GetResults([FromQuery] int studentId)
        {
            var results = _service.GetResults(studentId);
            return Ok(results);
        }
    }
}
