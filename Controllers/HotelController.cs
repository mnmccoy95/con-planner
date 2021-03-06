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
    public class HotelController : ControllerBase
    {
        private IHotelRepository _repo;
        private IUserRepository _userRepository;
        private IEventRepository _eventRepository;
        public HotelController(IHotelRepository repo, IUserRepository userRepository, IEventRepository eventRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _eventRepository = eventRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var hotel = _repo.GetHotelById(id);
            if (hotel == null)
            {
                return NotFound();
            }

            return Ok(hotel);
        }

        [HttpPost]
        public IActionResult Post(Hotel hotel)
        {
            _repo.Add(hotel);
            return CreatedAtAction("Get", new { id = hotel.Id }, hotel);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Hotel hotel)
        {
            if (id != hotel.Id)
            {
                return BadRequest();
            }

            _repo.Update(hotel);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
