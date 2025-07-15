using ExamSystem.Models;

namespace ExamSystem.Repositories.Interfaces
{
    public interface IMcqRepository : IRepository<MCQQuestion>
    {
        IEnumerable<MCQQuestion> GetAll();
        MCQQuestion GetByID(int id);
        void Add(MCQQuestion mcq);
        void Update(MCQQuestion mcq);
        void Delete(int id);
        void Save();
    }
}
