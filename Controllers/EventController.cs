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
    public class EventController : ControllerBase
    {
        private IEventRepository _repo;
        private IUserRepository _userRepository;
        public EventController(IEventRepository repo, IUserRepository userRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            var cosplays = _repo.GetByUserId(user.Id);
            return Ok(cosplays);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var eve = _repo.GetEventById(id);
            if (eve == null)
            {
                return NotFound();
            }

            return Ok(eve);
        }

        [HttpPost]
        public IActionResult Post(Event eve)
        {
            var currentUser = GetCurrentUserProfile();

            eve.UserId = currentUser.Id;

            _repo.Add(eve);
            return CreatedAtAction("Get", new { id = eve.Id }, eve);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var user = GetCurrentUserProfile();

            var eventToDelete = _repo.GetEventById(id);

            if (eventToDelete.UserId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Event eve)
        {
            if (id != eve.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();

            if (user.Id != eve.UserId)
            {
                return Unauthorized();
            }

            _repo.Update(eve);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
