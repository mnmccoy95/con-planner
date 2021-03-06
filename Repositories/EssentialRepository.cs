using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class EssentialRepository : IEssentialRepository
    {
        private ApplicationDbContext _context;

        public EssentialRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<Essential> GetByUserId(int userId)
        {
            return _context.Essentials.Where(e => e.UserId == userId).ToList();
        }

        public Essential GetByEssentialId(int essentialId)
        {
            return _context.Essentials.FirstOrDefault(e => e.Id == essentialId);
        }

        public void Add(Essential essential)
        {
            _context.Add(essential);
            _context.SaveChanges();
        }

        public void Update(Essential essential)
        {
            _context.Entry(essential).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int essentialId)
        {
            var essential = GetByEssentialId(essentialId);

            _context.Essentials.Remove(essential);
            _context.SaveChanges();
        }
    }
}
