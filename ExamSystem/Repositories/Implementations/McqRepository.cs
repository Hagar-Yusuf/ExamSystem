using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;

namespace ExamSystem.Repositories.Implementations
{
    public class McqRepository : IMcqRepository
    {
        public ExamDBContext Db { get; }

        public McqRepository(ExamDBContext db)
        {
            Db = db;
        }

        //GetAll Mcq Question
        public List<MCQQuestion> GetAll()
        {
            return Db.MCQQuestions.ToList();
        }

        //Get Mcq Question by ID
        public MCQQuestion GetByID(int id)
        {
            return Db.MCQQuestions.Find(id);
        }

        //Delete Mcq Question by ID
        public void Delete(int id)
        {
            MCQQuestion ex = GetByID(id);
            Db.MCQQuestions.Remove(ex);

        }

        //Add Mcq Questions
        public void Add(MCQQuestion entity)
        {
            Db.MCQQuestions.Add(entity);

        }

        //Update mcq question
        public void Update(MCQQuestion entity)
        {
            Db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        //Save changes to the database
        public void Save()
        {
            Db.SaveChanges();
        }
    }
}
