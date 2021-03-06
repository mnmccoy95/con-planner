using con_planner.Data;
using con_planner.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;

        public UserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public User GetByFirebaseUserId(string firebaseUserId)
        {
            return _context.Users
                .FirstOrDefault(up => up.FirebaseUserId == firebaseUserId);
        }

        public void Add(User userProfile)
        {
            _context.Add(userProfile);
            _context.SaveChanges();
        }
    }
}
