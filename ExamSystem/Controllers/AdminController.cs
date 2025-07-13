using ExamSystem.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        public ExamDBContext Db { get; }

        public AdminController(ExamDBContext db)
        {
            Db = db;
        }

        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = Db.Users.ToList();
            return Ok(users);
        }

    }
}
