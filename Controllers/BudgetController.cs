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
    public class BudgetController : ControllerBase
    {
        private IBudgetRepository _repo;
        private IUserRepository _userRepository;
        private IEventRepository _eventRepository;
        public BudgetController(IBudgetRepository repo, IUserRepository userRepository, IEventRepository eventRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var budget = _repo.GetBudgetById(id);
            if (budget == null)
            {
                return NotFound();
            }

            return Ok(budget);
        }

        [HttpPost]
        public IActionResult Post(Budget budget)
        {
            _repo.Add(budget);
            return CreatedAtAction("Get", new { id = budget.Id }, budget);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Budget budget)
        {
            if (id != budget.Id)
            {
                return BadRequest();
            }

            _repo.Update(budget);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
