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
    public class EssentialController : ControllerBase
    {
        private IEssentialRepository _repo;
        private IUserRepository _userRepository;
        public EssentialController(IEssentialRepository repo, IUserRepository userRepository)
        {
            _repo = repo;
            _userRepository = userRepository;
        }

        [HttpGet]
        public IActionResult Get()
        {
            var user = GetCurrentUserProfile();
            var essentials = _repo.GetByUserId(user.Id);
            return Ok(essentials);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var essential = _repo.GetByEssentialId(id);
            if (essential == null)
            {
                return NotFound();
            }

            return Ok(essential);
        }

        [HttpPost]
        public IActionResult Post(Essential essential)
        {
            var currentUser = GetCurrentUserProfile();

            essential.UserId = currentUser.Id;

            _repo.Add(essential);
            return CreatedAtAction("Get", new { id = essential.Id }, essential);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var user = GetCurrentUserProfile();

            var essentialToDelete = _repo.GetByEssentialId(id);

            if (essentialToDelete.UserId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Essential essential)
        {
            if (id != essential.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();

            if (user.Id != essential.UserId)
            {
                return Unauthorized();
            }

            _repo.Update(essential);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
