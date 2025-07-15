using ExamSystem.DTOs;
using ExamSystem.Models;

namespace ExamSystem.Repositories.Interfaces
{
    public interface ITrueFalseRepository : IRepository<TrueFalseQuestion>
    {
        IEnumerable<TrueFalseQuestion> GetAll();
        TrueFalseQuestion GetByID(int id);
        void Add(TrueFalseQuestion tf);
        void Update(TrueFalseQuestion tf);
        void Delete(int id);
        void Save();
    }
}
