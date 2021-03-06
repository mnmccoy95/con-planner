using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class CosplayRepository : ICosplayRepository
    {
        private ApplicationDbContext _context;

        public CosplayRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Cosplay> GetByUserId(int userId)
        {
            return _context.Cosplays.Where(c => c.UserId == userId).ToList();
        }

        public Cosplay GetCosplayById(int cosplayId)
        {
            return _context.Cosplays.Include(c => c.Items)
                .Include(c => c.Tasks).FirstOrDefault(c => c.Id == cosplayId);
        }

        public void Add(Cosplay cosplay)
        {
            _context.Add(cosplay);
            _context.SaveChanges();
        }

        public void Update(Cosplay cosplay)
        {
            _context.Entry(cosplay).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int cosplayId)
        {
            var cosplay = GetCosplayById(cosplayId);

            _context.Cosplays.Remove(cosplay);
            _context.SaveChanges();
        }
    }
}
