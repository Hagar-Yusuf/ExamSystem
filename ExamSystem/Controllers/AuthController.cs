using ExamSystem.DTOs;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;

        public AuthController(IAuthRepository authRepo)
        {
            _authRepo = authRepo;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterDto dto)
        {
            var user = _authRepo.Register(dto);
            return Ok(new { user.User_ID, user.Name, user.Email, user.Role });
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var token = _authRepo.Login(dto);
            if (token == null) return Unauthorized("Invalid credentials");
            return Ok(new { token });
        }
    }
}
