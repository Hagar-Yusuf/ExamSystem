using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamSystem.Repositories.Implementations
{
    public class AuthRepository : IAuthRepository
    {
        private readonly ExamDBContext _context;
        private readonly IConfiguration _config;

        public AuthRepository(ExamDBContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public User Register(RegisterDto dto)
        {
            var passwordHasher = new PasswordHasher<User>();
            var user = new User
            {
                Name = dto.Name,
                Email = dto.Email,
                Role = "Student"
            };

            user.PasswordHash = passwordHasher.HashPassword(user, dto.Password);

            _context.Users.Add(user);
            _context.SaveChanges();
            return user;
        }

        public string Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null) return null;

            var passwordHasher = new PasswordHasher<User>();

            // Check if password is hashed or plain text
            if (IsProbablyHashed(user.PasswordHash))
            {
                var result = passwordHasher.VerifyHashedPassword(user, user.PasswordHash, dto.Password);
                if (result == PasswordVerificationResult.Failed)
                    return null;
            }
            else
            {
                if (user.PasswordHash != dto.Password)
                    return null;

                // Upgrade plain password to hashed
                user.PasswordHash = passwordHasher.HashPassword(user, dto.Password);
                _context.SaveChanges();
            }

            // Generate JWT Token
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.User_ID.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Role, user.Role) // ✅ Role claim for [Authorize(Roles = "Admin")] support
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

        private bool IsProbablyHashed(string passwordHash)
        {
            try
            {
                Convert.FromBase64String(passwordHash);
                return true;
            }
            catch
            {
                return false;
            }
        }
    }
}
