using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IMcqRepository _mcqRepo;
        private readonly ITrueFalseRepository _tfRepo;
        private readonly IExamRepository _examRepo;

        public QuestionsController(IMcqRepository mcqRepo, ITrueFalseRepository tfRepo, IExamRepository examRepo)
        {
            _mcqRepo = mcqRepo;
            _tfRepo = tfRepo;
            _examRepo = examRepo;
        }

        [HttpPost("AddQuestion")]
        public IActionResult AddQuestion(QuestionAddDto dto)
        {
            if (dto == null)
                return BadRequest("Question data is null");

            var exam = _examRepo.GetByID(dto.Exam_ID ?? 0);
            if (exam == null)
                return NotFound($"Exam with ID {dto.Exam_ID} not found.");

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            if (dto.Type == QuestionType.MCQ)
            {
                var mcq = new MCQQuestion
                {
                    Body = dto.Body,
                    Mark = dto.Mark,
                    CorrectAnswer =int.Parse(dto.CorrectAnswer),
                    Option1 = dto.Option1,
                    Option2 = dto.Option2,
                    Option3 = dto.Option3,
                    Option4 = dto.Option4,
                    Exam_ID = dto.Exam_ID
                };
                _mcqRepo.Add(mcq);
                _mcqRepo.Save();
                return CreatedAtAction(nameof(GetMcqById), new { id = mcq.MCQ_ID }, mcq);
            }
            else if (dto.Type == QuestionType.TrueFalse)
            {
                if (!dto.CorrectAnswerBool.HasValue)
                    return BadRequest("True/False questions require a boolean correct answer.");

                var tf = new TrueFalseQuestion
                {
                    Body = dto.Body,
                    Mark = dto.Mark,
                    CorrectAnswer = dto.CorrectAnswerBool.Value ? 1 : 0,
                    Option1 = dto.Option1,
                    Option2 = dto.Option2,
                    Exam_ID = dto.Exam_ID
                };
                _tfRepo.Add(tf);
                _tfRepo.Save();
                return CreatedAtAction(nameof(GetTfById), new { id = tf.TrueFalse_ID }, tf);
            }
            else
            {
                return BadRequest("Invalid question type.");
            }
        }

        [HttpGet("GetMcq/{id}")]
        public IActionResult GetMcqById(int id)
        {
            var mcq = _mcqRepo.GetByID(id);
            if (mcq == null)
                return NotFound();
            return Ok(mcq);
        }

        [HttpGet("GetTrueFalse/{id}")]
        public IActionResult GetTfById(int id)
        {
            var tf = _tfRepo.GetByID(id);
            if (tf == null)
                return NotFound();
            return Ok(tf);
        }
    }
}
