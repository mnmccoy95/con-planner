using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class EventCosplayRepository : IEventCosplayRepository
    {
        private ApplicationDbContext _context;

        public EventCosplayRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public EventCosplay GetById(int eventCosplayId)
        {
            return _context.EventCosplays.FirstOrDefault(e => e.Id == eventCosplayId);
        }

        public void Add(EventCosplay eventCosplay)
        {
            _context.EventCosplays.Add(eventCosplay);
            _context.SaveChanges();
        }
        public void Delete(int eventCosplayId)
        {
            var ec = GetById(eventCosplayId);

            _context.EventCosplays.Remove(ec);
            _context.SaveChanges();
        }
    }
}
