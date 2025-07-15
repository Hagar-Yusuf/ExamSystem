    using ExamSystem.DTOs;
    using ExamSystem.Models;
    using ExamSystem.Repositories.Interfaces;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using System.Security.Claims;

    namespace ExamSystem.Controllers
    {
        [Authorize(Roles = "Admin")]
        [Route("api/[controller]")]
        [ApiController]
        public class ExamController : ControllerBase
        {
            private readonly IExamRepository examRepository;

            public ExamController(IExamRepository examRepo)
            {
                examRepository = examRepo;
            }

            private int? GetUserIdFromToken()
            {
                var claim = User.FindFirst(ClaimTypes.NameIdentifier);
                return claim != null ? int.Parse(claim.Value) : null;
            }

            private string GetUserRoleFromToken()
            {
                return User.FindFirst(ClaimTypes.Role)?.Value;
            }

            [HttpGet("ViewExam/{id}")]
            public IActionResult GetByID(int id)
            {
                int? userId = GetUserIdFromToken();
                string role = GetUserRoleFromToken();

                if (userId == null || role != "Admin")
                    return Unauthorized("Invalid token or role.");

                var exam = examRepository.GetByID(id);
                if (exam == null)
                    return NotFound();

                var examDTO = new ExamDto
                {
                    Exam_ID = exam.Exam_ID,
                    Title = exam.Title,
                    Description = exam.Description,
                    Duration = exam.Duration
                };
                return Ok(examDTO);
            }

            [HttpGet("ViewAllExams")]
            public IActionResult GetAll()
            {
                int? userId = GetUserIdFromToken();
                string role = GetUserRoleFromToken();

                if (userId == null || role != "Admin")
                    return Unauthorized("Invalid token or role.");

                var exams = examRepository.GetAll().ToList();
                var examDTOs = exams.Select(ex => new ExamDto
                {
                    Exam_ID = ex.Exam_ID,
                    Title = ex.Title,
                    Description = ex.Description,
                    Duration = ex.Duration
                }).ToList();

                return Ok(examDTOs);
            }

            [HttpPost("AddExam")]
            public IActionResult AddExam(ExamDto examDTO)
            {
                int? userId = GetUserIdFromToken();
                string role = GetUserRoleFromToken();

                if (userId == null || role != "Admin")
                    return Unauthorized("Invalid token or role.");

                if (examDTO == null) return BadRequest();

                if (ModelState.IsValid)
                {
                    var exam = new Exam
                    {
                        Title = examDTO.Title,
                        Description = examDTO.Description,
                        Duration = examDTO.Duration
                    };
                    examRepository.Add(exam);
                    examRepository.Save();
                    return CreatedAtAction("GetByID", new { id = exam.Exam_ID }, examDTO);
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }

            [HttpPut("EditExam/{id}")]
            public IActionResult EditExam(ExamDto examDTO, int id)
            {
                int? userId = GetUserIdFromToken();
                string role = GetUserRoleFromToken();

                if (userId == null || role != "Admin")
                    return Unauthorized("Invalid token or role.");

                if (examDTO == null) return BadRequest();
                if (examDTO.Exam_ID != id) return BadRequest("Mismatched exam ID.");

                if (ModelState.IsValid)
                {
                    var exam = examRepository.GetByID(id);
                    if (exam == null)
                        return NotFound($"No exam found with ID {id}");

                    exam.Title = examDTO.Title;
                    exam.Description = examDTO.Description;
                    exam.Duration = examDTO.Duration;

                    examRepository.Update(exam);
                    examRepository.Save();
                    return NoContent();
                }
                else
                {
                    return BadRequest();
                }
            }

            [HttpDelete("DeleteExam/{id}")]
            public IActionResult DeleteExam(int id)
            {
                int? userId = GetUserIdFromToken();
                string role = GetUserRoleFromToken();

                if (userId == null || role != "Admin")
                    return Unauthorized("Invalid token or role.");

                var exam = examRepository.GetByID(id);
                if (exam == null)
                    return NotFound();

                var examDTO = new ExamDto
                {
                    Exam_ID = exam.Exam_ID,
                    Title = exam.Title,
                    Description = exam.Description,
                    Duration = exam.Duration
                };

                examRepository.Delete(id);
                examRepository.Save();
                return Ok(examDTO);
            }
        }
    }
