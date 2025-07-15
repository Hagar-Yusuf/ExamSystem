using ExamSystem.Models;

namespace ExamSystem.Repositories.Interfaces
{
    public interface IExamRepository : IRepository<Exam>
    {
        Exam GetByID(int id);
    }
}
