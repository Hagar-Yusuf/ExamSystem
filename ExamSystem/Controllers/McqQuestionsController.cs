using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("api/[controller]")]
    [ApiController]
    public class McqQuestionsController : ControllerBase
    {
        IMcqRepository McqRepository;
        IExamRepository examRepository;

        public McqQuestionsController(IMcqRepository mcqRepo, IExamRepository examRepo)
        {
            McqRepository = mcqRepo;
            examRepository = examRepo;
        }


        ///////////////////GetByID//////////////////////
        [HttpGet("View-Mcq-Question/{id}")]
        public IActionResult GetByID(int id)
        {
            var Mcq = McqRepository.GetByID(id);
            if (Mcq == null)
                return NotFound();

            var mcqDto = new McqDTO
            {
                MCQ_ID = Mcq.MCQ_ID,
                Body = Mcq.Body,
                Mark = Mcq.Mark,
                CorrectAnswer = Mcq.CorrectAnswer,
                Option1 = Mcq.Option1,
                Option2 = Mcq.Option2,
                Option3 = Mcq.Option3,
                Option4 = Mcq.Option4,
                Exam_ID = Mcq.Exam_ID
            };
            return Ok(mcqDto);


        }
        ///////////////////Get ALL Exams//////////////////////
        [HttpGet("ViewAll-Mcq-Questions")]
        public IActionResult GetAll()
        {
            var Mcqs = McqRepository.GetAll().ToList();
            List<McqDTO> mcqDTOs = new List<McqDTO>();
            foreach (MCQQuestion tfQ in Mcqs)
            {
                McqDTO mcqDto = new McqDTO()
                {
                    MCQ_ID = tfQ.MCQ_ID,
                    Body = tfQ.Body,
                    Mark = tfQ.Mark,
                    CorrectAnswer = tfQ.CorrectAnswer,
                    Option1 = tfQ.Option1,
                    Option2 = tfQ.Option2,
                    Option3 = tfQ.Option3,
                    Option4 = tfQ.Option4,
                    Exam_ID = tfQ.Exam_ID
                };
                mcqDTOs.Add(mcqDto);
            }
            return Ok(mcqDTOs);

        }
        ///////////////////Add TrueFalseQuestion//////////////////////
        [HttpPost("Add-Mcq-Question")]
        public IActionResult AddMcqQuestion(McqDTO mcqDTO)
        {
            if (mcqDTO == null) return BadRequest();
            var exam = examRepository.GetByID(mcqDTO.Exam_ID ?? 0);
            if (exam == null)
                return NotFound($"Exam with ID {mcqDTO.Exam_ID} not found.");
            if (ModelState.IsValid)
            {
                var mcq = new MCQQuestion
                {
                    Body = mcqDTO.Body,
                    Mark = mcqDTO.Mark,
                    CorrectAnswer = mcqDTO.CorrectAnswer,
                    Option1 = mcqDTO.Option1,
                    Option2 = mcqDTO.Option2,
                    Option3 = mcqDTO.Option3,
                    Option4 = mcqDTO.Option4,
                    Exam_ID = mcqDTO.Exam_ID
                };
                McqRepository.Add(mcq);
                McqRepository.Save();
                return CreatedAtAction("GetByID", new { id = mcq.Exam_ID }, mcqDTO);

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        ///////////////////Edit McqQuestion//////////////////////
        [HttpPut("Edit-Mcq-Question/{id}")]
        public IActionResult EditMcqQuestion(McqDTO mcqDTO, int id)
        {
            if (mcqDTO == null) return BadRequest();
            if (mcqDTO.MCQ_ID != id) return BadRequest("Mismatched question ID.");
            if (ModelState.IsValid)
            {
                var mcq = McqRepository.GetByID(id);
                if (mcq == null)
                    return NotFound($"No Question found with ID {id}");
                var exam = examRepository.GetByID(mcqDTO.Exam_ID ?? 0);
                if (exam == null)
                    return NotFound($"No exam found with ID {mcqDTO.Exam_ID}");

                mcq.Body = mcqDTO.Body;
                mcq.Mark = mcqDTO.Mark;
                mcq.CorrectAnswer = mcqDTO.CorrectAnswer;
                mcq.Option1 = mcqDTO.Option1;
                mcq.Option2 = mcqDTO.Option2;
                mcq.Option3 = mcqDTO.Option3;
                mcq.Option4 = mcqDTO.Option4;
                mcq.Exam_ID = mcqDTO.Exam_ID;

                McqRepository.Update(mcq);
                McqRepository.Save();
                return NoContent();

            }
            else
            {
                return BadRequest();
            }

        }

        ///////////////////Delete TFQuestion//////////////////////
        [HttpDelete("api/Delete-Mcq-Question/{id}")]
        public IActionResult DeleteMcqQuestion(int id)
        {
            var mcq = McqRepository.GetByID(id);
            if (mcq == null) return NotFound();
            else
            {
                McqDTO mcqDTO = new McqDTO()
                {
                    MCQ_ID = mcq.MCQ_ID,
                    Body = mcq.Body,
                    Mark = mcq.Mark,
                    CorrectAnswer = mcq.CorrectAnswer,
                    Option1 = mcq.Option1,
                    Option2 = mcq.Option2,
                    Option3 = mcq.Option3,
                    Option4 = mcq.Option4,
                    Exam_ID = mcq.Exam_ID
                };
                McqRepository.Delete(id);
                McqRepository.Save();
                return Ok(mcqDTO);
            }

        }
    }
}
