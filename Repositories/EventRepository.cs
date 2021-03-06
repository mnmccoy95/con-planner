using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class EventRepository : IEventRepository
    {
        private ApplicationDbContext _context;

        public EventRepository(ApplicationDbContext context)
        {
            _context = context;
        }
        public List<Event> GetByUserId(int userId)
        {
            return _context.Events.Where(c => c.UserId == userId).ToList();
        }

        public Event GetEventById(int eventId)
        {
            return _context.Events.Include(c => c.Budget)
                .Include(c => c.Cosplays).Include(c => c.Essentials)
                .Include(c => c.Hotel)
                .FirstOrDefault(c => c.Id == eventId);
        }
        public void Add(Event eventObj)
        {
            _context.Add(eventObj);
            _context.SaveChanges();
        }
        public void Update(Event eventObj)
        {
            _context.Entry(eventObj).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int eventId)
        {
            var eventObj = GetEventById(eventId);

            _context.Events.Remove(eventObj);
            _context.SaveChanges();
        }
    }
}
