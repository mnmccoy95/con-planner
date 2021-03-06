using con_planner.Models;
using con_planner.Repositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace con_planner.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class TaskController : ControllerBase
    {
        private ITaskRepository _repo;
        private IUserRepository _userRepository;
        private ICosplayRepository _cosplayRepository;
        public TaskController(ITaskRepository repo, IUserRepository userRepository, ICosplayRepository cosplayRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _cosplayRepository = cosplayRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var task = _repo.GetTaskById(id);
            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }

        [HttpPost]
        public IActionResult Post(Models.Task task)
        {
            _repo.Add(task);
            return CreatedAtAction("Get", new { id = task.Id }, task);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Models.Task task)
        {
            if (id != task.Id)
            {
                return BadRequest();
            }

            _repo.Update(task);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
