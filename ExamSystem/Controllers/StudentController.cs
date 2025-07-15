using ExamSystem.DTOs;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ExamSystem.Controllers
{
    [Authorize(Roles = "Student")]
    [ApiController]
    [Route("api/student")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentService _service;
        private int GetStudentIdFromToken()
        {
            var claim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            return claim != null ? int.Parse(claim.Value) : 0;
        }

        public StudentController(IStudentService service)
        {
            _service = service;
        }
        [HttpGet("exams")]
        public IActionResult GetAvailableExams()
        {
            int studentId = GetStudentIdFromToken();
            var exams = _service.GetAvailableExamsForStudent(studentId);
            return Ok(exams);
        }

        [HttpGet("exams/{examId}")]
        public IActionResult GetExamWithQuestions(int examId)
        {
            int studentId = GetStudentIdFromToken();
            var exam = _service.GetExamWithQuestions(examId, studentId);
            if (exam == null)
                return NotFound("Not authorized or exam not found.");
            return Ok(exam);
        }

        [HttpPost("exams/{examId}/start")]
        public IActionResult StartExam(int examId)
        {
            int studentId = GetStudentIdFromToken();
            var exam = _service.StartExam(studentId, examId);
            if (exam == null)
                return NotFound("Exam not found.");
            return Ok(exam);
        }

        [HttpPost("exams/submit")]
        public IActionResult SubmitExam(SubmitExamDto dto)
        {
            int studentId = GetStudentIdFromToken();
            dto.StudentId = studentId;
            var score = _service.SubmitExam(dto);
            return Ok(new { score });
        }
        [HttpGet("results")]
        public IActionResult GetResults()
        {
            int studentId = GetStudentIdFromToken();
            var results = _service.GetResults(studentId);
            return Ok(results);
        }
    }
}
