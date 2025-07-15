using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;

namespace ExamSystem.Repositories.Implementations
{
    public class StudentService : IStudentService
    {
        private readonly ExamDBContext _context;

        public StudentService(ExamDBContext context)
        {
            _context = context;
        }

        public List<AvailableExamDto> GetAvailableExamsForStudent(int studentId)
        {
            return _context.StudentExams
                .Where(se => se.Student_ID == studentId)
                .Select(se => new AvailableExamDto
                {
                    Exam_ID = se.Exam.Exam_ID,
                    Title = se.Exam.Title,
                    Description = se.Exam.Description,
                    Duration = (int)se.Exam.Duration,
                    IsSubmitted = se.isSubmitted
                })
                .ToList();
        }

        public ExamDto GetExamWithQuestions(int examId, int studentId)
        {
            var exam = _context.Exams.FirstOrDefault(e => e.Exam_ID == examId);
            var studentExam = _context.StudentExams.FirstOrDefault(se => se.Exam_ID == examId && se.Student_ID == studentId);

            if (exam == null || studentExam == null) return null;

            return new ExamDto
            {
                Exam_ID = exam.Exam_ID,
                Title = exam.Title,
                Description = exam.Description,
                Duration = exam.Duration,
                Questions = exam.MCQQuestions.Select(q => new QuestionDto
                {
                    QuestionId = q.MCQ_ID,
                    Body = q.Body,
                    Mark = q.Mark,
                    Options = new List<string> { q.Option1, q.Option2, q.Option3, q.Option4 },
                    Type = "MCQ"
                })
                .Concat(exam.TrueFalseQuestions.Select(q => new QuestionDto
                {
                    QuestionId = q.TrueFalse_ID,
                    Body = q.Body,
                    Mark = q.Mark,
                    Options = new List<string> { q.Option1, q.Option2 },
                    Type = "TrueFalse"
                }))
                .ToList()
            };
        }

        public ExamDto StartExam(int studentId, int examId)
        {
            var studentExam = _context.StudentExams
                .FirstOrDefault(se => se.Student_ID == studentId && se.Exam_ID == examId);

            if (studentExam == null)
            {
                studentExam = new StudentExam
                {
                    Student_ID = studentId,
                    Exam_ID = examId,
                    isSubmitted = false
                };
                _context.StudentExams.Add(studentExam);
                _context.SaveChanges();
            }

            var exam = _context.Exams.FirstOrDefault(e => e.Exam_ID == examId);
            if (exam == null) return null;

            return new ExamDto
            {
                Exam_ID = exam.Exam_ID,
                Title = exam.Title,
                Description = exam.Description,
                Duration = exam.Duration,
                Questions = exam.MCQQuestions.Select(q => new QuestionDto
                {
                    QuestionId = q.MCQ_ID,
                    Body = q.Body,
                    Mark = q.Mark,
                    Options = new List<string> { q.Option1, q.Option2, q.Option3, q.Option4 },
                    Type = "MCQ"
                })
                .Concat(exam.TrueFalseQuestions.Select(q => new QuestionDto
                {
                    QuestionId = q.TrueFalse_ID,
                    Body = q.Body,
                    Mark = q.Mark,
                    Options = new List<string> { q.Option1, q.Option2 },
                    Type = "TrueFalse"
                }))
                .ToList()
            };
        }

        public double SubmitExam(SubmitExamDto dto)
        {
            var exam = _context.Exams.FirstOrDefault(e => e.Exam_ID == dto.ExamId);
            if (exam == null) return 0;

            double totalScore = 0;
            double maxScore = 0;

            var studentExamId = _context.StudentExams
                .Where(se => se.Student_ID == dto.StudentId && se.Exam_ID == dto.ExamId)
                .Select(se => se.StudentExam_ID)
                .FirstOrDefault();

            foreach (var answer in dto.Answers)
            {
                if (answer.McqId.HasValue)
                {
                    var question = _context.MCQQuestions.Find(answer.McqId.Value);
                    if (question != null)
                    {
                        maxScore += question.Mark ?? 0;
                        if (question.CorrectAnswer == answer.SelectedOption)
                            totalScore += question.Mark ?? 0;
                    }
                }
                else if (answer.TrueFalseId.HasValue)
                {
                    var question = _context.TrueFalseQuestions.Find(answer.TrueFalseId.Value);
                    if (question != null)
                    {
                        maxScore += question.Mark ?? 0;
                        if (question.CorrectAnswer == answer.SelectedOption)
                            totalScore += question.Mark ?? 0;
                    }
                }

                _context.Answers.Add(new Answer
                {
                    MCQ_ID = answer.McqId,
                    TrueFalse_ID = answer.TrueFalseId,
                    Selected = answer.SelectedOption,
                    StudentExam_ID = studentExamId
                });
            }

            var studentExam = _context.StudentExams
                .FirstOrDefault(se => se.Student_ID == dto.StudentId && se.Exam_ID == dto.ExamId);

            if (studentExam != null)
            {
                studentExam.isSubmitted = true;
            }

            _context.Results.Add(new Result
            {
                Exam_ID = dto.ExamId,
                User_ID = dto.StudentId,
                Score = totalScore
            });

            _context.SaveChanges();
            return totalScore;
        }

        public List<StudentResultDto> GetResults(int studentId)
        {
            return _context.Results
                .Where(r => r.User_ID == studentId)
                .Select(r => new StudentResultDto
                {
                    Result_ID = r.Result_ID,
                    Exam_ID = (int)r.Exam_ID,
                    User_ID = (int)r.User_ID,
                    Score = (double)r.Score
                })
                .ToList();
        }
    }
}
