using ExamSystem.DTOs;
using ExamSystem.Models;

namespace ExamSystem.Repositories.Interfaces
{
    public interface IAuthRepository
    {
        User Register(RegisterDto dto);
        string Login(LoginDto dto);
    }
}
