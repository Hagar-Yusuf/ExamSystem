using ExamSystem.DTOs;
using ExamSystem.Models;
using ExamSystem.Repositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ExamSystem.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExamController : ControllerBase
    {
        IExamRepository examRepository;
        public ExamController(IExamRepository examRepo)
        {
               examRepository = examRepo;
        }

                          ///////////////////GetByID//////////////////////
        [HttpGet("ViewExam/{id}")]
        public IActionResult GetByID(int id)
        {
            var exam = examRepository.GetByID(id);
            if (exam == null)
                return NotFound();

            var examDTO = new ExamDTO
            {
                Exam_ID = exam.Exam_ID,
                Title = exam.Title,
                Description = exam.Description,
                Duration = exam.Duration
            };
            return Ok(examDTO);


        }
        ///////////////////Get ALL Exams//////////////////////
        [HttpGet("ViewAllExams")]
        public IActionResult GetAll()
        {
            var exams = examRepository.GetAll().ToList();
            List<ExamDTO> examDTOs = new List<ExamDTO>();
            foreach(Exam ex in exams)
            {
                ExamDTO exDto = new ExamDTO()
                {
                    Exam_ID = ex.Exam_ID,
                    Title = ex.Title,
                    Description = ex.Description,
                    Duration = ex.Duration

                };
                examDTOs.Add(exDto);
            }
            return Ok(examDTOs);
            
        }

        ///////////////////Add Exam//////////////////////
        [HttpPost("AddExam")]
        public IActionResult AddExam(ExamDTO examDTO)
        {
            if (examDTO == null) return BadRequest();

            if (ModelState.IsValid)
            {
                var Exam = new Exam
                {
                    Title = examDTO.Title,
                    Description = examDTO.Description,
                    Duration = examDTO.Duration
                };
                examRepository.Add(Exam);
                examRepository.Save();
                return CreatedAtAction("GetByID", new {id = Exam.Exam_ID}, examDTO);

            }
            else
            {
                return BadRequest(ModelState);
            }
        }
        ///////////////////Edit Exam//////////////////////
        [HttpPut("EditExam/{id}")]
        public IActionResult EditExam(ExamDTO examDTO,int id)
        {
           if(examDTO == null) return BadRequest();
           if(examDTO.Exam_ID != id) return BadRequest("Mismatched question ID.");
           if (ModelState.IsValid)
            {
                var exam = examRepository.GetByID(id);
                if (exam == null)
                    return NotFound($"No exam found with ID {id}");
                exam.Title = examDTO.Title;
                exam.Description = examDTO.Description;
                exam.Duration = examDTO.Duration;

                examRepository.Update(exam);
                examRepository.Save();
                return NoContent();
               
            }
            else
            {
                return BadRequest();
            }

        }
        ///////////////////Delete Exam//////////////////////
        [HttpDelete("DeleteExam/{id}")]
        public IActionResult DeleteExam(int id)
        {
            var exam = examRepository.GetByID(id);
            if (exam == null) return NotFound();
            else
            {
                ExamDTO examDTO = new ExamDTO()
                {
                    Exam_ID = exam.Exam_ID,
                    Title = exam.Title,
                    Description = exam.Description,
                    Duration = exam.Duration,
                };
                examRepository.Delete(id);
                examRepository.Save();
                return Ok(examDTO);
            }

        }

    }
}
