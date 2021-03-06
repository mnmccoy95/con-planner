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
    public class EventCosplayController : ControllerBase
    {
        private IEventCosplayRepository _repo;
        private IUserRepository _userRepository;
        private IEventRepository _eventRepository;
        public EventCosplayController(IEventCosplayRepository repo, IUserRepository userRepository, IEventRepository eventRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var ec = _repo.GetById(id);
            if (ec == null)
            {
                return NotFound();
            }

            return Ok(ec);
        }

        [HttpPost]
        public IActionResult Post(EventCosplay ec)
        {
            _repo.Add(ec);
            return CreatedAtAction("Get", new { id = ec.Id }, ec);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
