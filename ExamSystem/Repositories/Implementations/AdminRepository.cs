using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;


namespace ExamSystem.Repositories.Implementations
{
    public class AdminRepository : IAdminRepository
    {
        private readonly ExamDBContext _context;

        public AdminRepository(ExamDBContext context)
        {
            _context = context;
        }

        public IEnumerable<StudentDto> GetAllStudents()
        {
            return _context.Users
                .Where(u => u.Role == "Student")
                .Select(u => new StudentDto
                {
                    User_ID = u.User_ID,
                    Name = u.Name,
                    Email = u.Email
                }).ToList();
        }

        public IEnumerable<StudentResultDto> GetAllStudentResults()
        {
            return _context.Results
                .Include(r => r.User)
                .Include(r => r.Exam)
                .Where(r => r.User.Role == "Student")
                .Select(r => new StudentResultDto
                {
                    Result_ID = r.Result_ID,
                    Exam_ID = r.Exam_ID ?? 0,
                    ExamTitle = r.Exam.Title,
                    User_ID = r.User_ID ?? 0,
                    StudentName = r.User.Name,
                    Score = r.Score ?? 0
                })
                .ToList();
        }

        
    }

}
