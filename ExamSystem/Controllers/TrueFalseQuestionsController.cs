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
    public class TrueFalseQuestionsController : ControllerBase
    {
        ITrueFalseRepository TrueFalseRepository;
        IExamRepository examRepository;

        public TrueFalseQuestionsController(ITrueFalseRepository trueFalseRepo, IExamRepository examRepo)
        {
            TrueFalseRepository = trueFalseRepo;
            examRepository = examRepo;
        }


        ///////////////////GetByID//////////////////////
        [HttpGet("View-TrueFalse-Questions/{id}")]
        public IActionResult GetByID(int id)
        {
            var TrueFalseQ = TrueFalseRepository.GetByID(id);
            if (TrueFalseQ == null)
                return NotFound();

            var truefalseDto = new TrueFalseDTO
            {
                TrueFalse_ID = TrueFalseQ.TrueFalse_ID,
                Body = TrueFalseQ.Body,
                Mark = TrueFalseQ.Mark,
                CorrectAnswer = TrueFalseQ.CorrectAnswer,
                Option1 = TrueFalseQ.Option1,
                Option2 = TrueFalseQ.Option2,
                Exam_ID = TrueFalseQ.Exam_ID
               
            };
            return Ok(truefalseDto);


        }
        ///////////////////Get ALL Exams//////////////////////
        [HttpGet("ViewAll-TrueFalse-Questions")]
        public IActionResult GetAll()
        {
            var TrueFalseQs = TrueFalseRepository.GetAll().ToList();
            List<TrueFalseDTO> tfDTOs = new List<TrueFalseDTO>();
            foreach (TrueFalseQuestion tfQ  in TrueFalseQs)
            {
                TrueFalseDTO tfDto = new TrueFalseDTO()
                {
                    TrueFalse_ID = tfQ.TrueFalse_ID,
                    Body = tfQ.Body,
                    Mark= tfQ.Mark,
                    CorrectAnswer = tfQ.CorrectAnswer,
                    Option1 = tfQ.Option1,
                    Option2 = tfQ.Option2,
                    Exam_ID = tfQ.Exam_ID

                };
                tfDTOs.Add(tfDto);
            }
            return Ok(tfDTOs);

        }
        ///////////////////Add TrueFalseQuestion//////////////////////
        [HttpPost("Add-TrueFalse-Question")]
        public IActionResult AddTrueFalseQuestion(TrueFalseDTO trueFalseDTO)
        {
            if (trueFalseDTO == null) return BadRequest();
            var exam = examRepository.GetByID(trueFalseDTO.Exam_ID ?? 0);
            if (exam == null)
                return NotFound($"Exam with ID {trueFalseDTO.Exam_ID} not found.");
            if (ModelState.IsValid)
            {
                var truefalseQ = new TrueFalseQuestion
                {
                    Body = trueFalseDTO.Body,
                    Mark = trueFalseDTO.Mark,
                    CorrectAnswer = trueFalseDTO.CorrectAnswer,
                    Option1 = trueFalseDTO.Option1,
                    Option2 = trueFalseDTO.Option2,
                    Exam_ID = trueFalseDTO.Exam_ID

                };
                TrueFalseRepository.Add(truefalseQ);
                TrueFalseRepository.Save();
                return CreatedAtAction("GetByID", new { id = truefalseQ.TrueFalse_ID }, trueFalseDTO);

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        ///////////////////Edit TrueFalseQuestion//////////////////////
        [HttpPut("Edit-TrueFalse-Question/{id}")]
        public IActionResult EditTrueFalseQuestion(TrueFalseDTO trueFalseDTO, int id)
        {
            if (trueFalseDTO == null) return BadRequest();
            if (trueFalseDTO.TrueFalse_ID != id) return BadRequest("Mismatched question ID.");
            if (ModelState.IsValid)
            {
                var TrueFalseQ = TrueFalseRepository.GetByID(id);
                if (TrueFalseQ == null)
                    return NotFound($"No Question found with ID {id}");
                var exam = examRepository.GetByID(trueFalseDTO.Exam_ID ?? 0);
                if (exam == null)
                    return NotFound($"No exam found with ID {trueFalseDTO.Exam_ID}");

                TrueFalseQ.Option1 = trueFalseDTO.Option1;
                TrueFalseQ.Option2 = trueFalseDTO.Option2;
                TrueFalseQ.Body = trueFalseDTO.Body;
                TrueFalseQ.Mark = trueFalseDTO.Mark;
                TrueFalseQ.CorrectAnswer = trueFalseDTO.CorrectAnswer;
                TrueFalseQ.Exam_ID = trueFalseDTO.Exam_ID;

                TrueFalseRepository.Update(TrueFalseQ);
                TrueFalseRepository.Save();
                return NoContent();

            }
            else
            {
                return BadRequest();
            }

        }

        ///////////////////Delete TFQuestion//////////////////////
        [HttpDelete("Delete-TrueFalse-Question/{id}")]
        public IActionResult DeleteTFQuestion(int id)
        {
            var TrueFalseQ = TrueFalseRepository.GetByID(id);
            if (TrueFalseQ == null) return NotFound();
            else
            {
                TrueFalseDTO TFDTO = new TrueFalseDTO()
                {
                    Body = TrueFalseQ.Body,
                    Mark = TrueFalseQ.Mark,
                    Option2 = TrueFalseQ.Option2,
                    Option1 = TrueFalseQ.Option1,
                    CorrectAnswer = TrueFalseQ.CorrectAnswer,
                    Exam_ID = TrueFalseQ.Exam_ID,
                };
                TrueFalseRepository.Delete(id);
                TrueFalseRepository.Save();
                return Ok(TFDTO);
            }

        }

    }
}
