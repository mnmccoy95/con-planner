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
    public class ItemController : ControllerBase
    {
        private IItemRepository _repo;
        private IUserRepository _userRepository;
        private ICosplayRepository _cosplayRepository;
        public ItemController(IItemRepository repo, IUserRepository userRepository, ICosplayRepository cosplayRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
            _cosplayRepository = cosplayRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var item = _repo.GetItemById(id);
            if (item == null)
            {
                return NotFound();
            }

            return Ok(item);
        }

        [HttpPost]
        public IActionResult Post(Item item)
        {
            _repo.Add(item);
            return CreatedAtAction("Get", new { id = item.Id }, item);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Item item)
        {
            if (id != item.Id)
            {
                return BadRequest();
            }

            _repo.Update(item);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
