using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class EventEssentialRepository : IEventEssentialRepository
    {
        private ApplicationDbContext _context;

        public EventEssentialRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public EventEssential GetById(int eventEssentialId)
        {
            return _context.EventEssentials.FirstOrDefault(e => e.Id == eventEssentialId);
        }

        public void Add(EventEssential eventEssential)
        {
            _context.EventEssentials.Add(eventEssential);
            _context.SaveChanges();
        }
        public void Delete(int eventEssentialId)
        {
            var ee = GetById(eventEssentialId);

            _context.EventEssentials.Remove(ee);
            _context.SaveChanges();
        }
    }
}
