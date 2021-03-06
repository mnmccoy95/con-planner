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
    public class EventEssentialController : ControllerBase
    {
        private IEventEssentialRepository _repo;
        private IUserRepository _userRepository;
        private IEventRepository _eventRepository;
        public EventEssentialController(IEventEssentialRepository repo, IUserRepository userRepository, IEventRepository eventRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var ee = _repo.GetById(id);
            if (ee == null)
            {
                return NotFound();
            }

            return Ok(ee);
        }

        [HttpPost]
        public IActionResult Post(EventEssential ee)
        {
            _repo.Add(ee);
            return CreatedAtAction("Get", new { id = ee.Id }, ee);
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
