using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;

namespace ExamSystem.Repositories.Implementations
{
    public class ExamRepository : IExamRepository
    {
        public ExamDBContext Db { get; }

        public ExamRepository(ExamDBContext db)
        {
            Db = db;
        }

        //GetAll Exams
        public List<Exam> GetAll()
        {
            return Db.Exams.ToList();   
        }

        //Get Exam by ID
        public Exam GetByID(int id)
        {
            return Db.Exams.Find(id);
        }

        //Delete Exam by ID
        public void Delete(int id)
        {
            Exam ex = GetByID(id);
            Db.Exams.Remove(ex);

        }

        //Add Exam
        public void Add(Exam entity)
        {
            Db.Exams.Add(entity);

        }

        //Update Exam
        public void Update(Exam entity)
        {
            Db.Entry(entity).State= Microsoft.EntityFrameworkCore.EntityState.Modified;
        }

        //Save changes to the database
        public void Save()
        {
            Db.SaveChanges();
        }
    }
}
