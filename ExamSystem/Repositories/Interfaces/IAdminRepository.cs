using ExamSystem.DTOs;

namespace ExamSystem.Repositories.Interfaces
{
    public interface IAdminRepository
    {
            IEnumerable<StudentDto> GetAllStudents();
            IEnumerable<StudentResultDto> GetAllStudentResults();

    }
}
