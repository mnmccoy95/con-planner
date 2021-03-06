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
    public class CosplayController : ControllerBase
    {
        private ICosplayRepository _repo;
        private IUserRepository _userRepository;
        public CosplayController(ICosplayRepository repo, IUserRepository userRepository)
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
            var cosplay = _repo.GetCosplayById(id);
            if (cosplay == null)
            {
                return NotFound();
            }

            return Ok(cosplay);
        }

        [HttpPost]
        public IActionResult Post(Cosplay cosplay)
        {
            var currentUser = GetCurrentUserProfile();

            cosplay.UserId = currentUser.Id;

            _repo.Add(cosplay);
            return CreatedAtAction("Get", new { id = cosplay.Id }, cosplay);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {

            var user = GetCurrentUserProfile();

            var cosplayToDelete = _repo.GetCosplayById(id);

            if (cosplayToDelete.UserId != user.Id)
            {
                return Unauthorized();
            }

            _repo.Delete(id);
            return NoContent();
        }

        [HttpPut("{id}")]
        public IActionResult Update(int id, Cosplay cosplay)
        {
            if (id != cosplay.Id)
            {
                return BadRequest();
            }

            var user = GetCurrentUserProfile();

            if (user.Id != cosplay.UserId)
            {
                return Unauthorized();
            }

            _repo.Update(cosplay);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
