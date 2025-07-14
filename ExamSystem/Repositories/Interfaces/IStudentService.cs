using ExamSystem.DTOs;
using ExamSystem.Models;

namespace ExamSystem.Repositories.Interfaces
{
    public interface IStudentService
    {
        User Register(RegisterDto dto);
        List<AvailableExamDto> GetAvailableExamsForStudent(int studentId);
        ExamDto GetExamWithQuestions(int examId, int studentId);
        ExamDto StartExam(int studentId, int examId);
        double SubmitExam(SubmitExamDto dto);
        List<StudentResultDto> GetResults(int studentId);

    }
}
