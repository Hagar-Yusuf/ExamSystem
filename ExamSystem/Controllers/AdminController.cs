using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly IAdminRepository _repo;

        public AdminController(IAdminRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("students")]
        public IActionResult GetStudents()
        {
            var students = _repo.GetAllStudents();
            return Ok(students);
        }

        [HttpGet("results")]
        public IActionResult GetResults()
        {
            var results = _repo.GetAllStudentResults();
            return Ok(results);
        }
    }
}
