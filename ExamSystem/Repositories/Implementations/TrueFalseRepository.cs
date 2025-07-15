using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;

public class TrueFalseRepository :  ITrueFalseRepository
{
    public ExamDBContext Db { get; }

    public TrueFalseRepository(ExamDBContext db)
    {
        Db = db;
    }

    //GetAll TrueFalse Question
    public List<TrueFalseQuestion> GetAll()
    {
        return Db.TrueFalseQuestions.ToList();
    }

    //Get TrueFalse Question by ID
    public TrueFalseQuestion GetByID(int id)
    {
        return Db.TrueFalseQuestions.Find(id);
    }

    //Delete TrueFalse Question by ID
    public void Delete(int id)
    {
        TrueFalseQuestion ex = GetByID(id);
        Db.TrueFalseQuestions.Remove(ex);
    }

    //Add TrueFalseQuestions
    public void Add(TrueFalseQuestion entity)
    {
        Db.TrueFalseQuestions.Add(entity);
    }

    //Update TrueFalse question
    public void Update(TrueFalseQuestion entity)
    {
        Db.Entry(entity).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
    }

    //Save changes to the database
    public void Save()
    {
        Db.SaveChanges();
    }

    IEnumerable<TrueFalseQuestion> ITrueFalseRepository.GetAll()
    {
        return GetAll();
    }
}
