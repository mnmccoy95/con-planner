using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class HotelRepository : IHotelRepository
    {
        private ApplicationDbContext _context;

        public HotelRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Hotel GetHotelById(int hotelId)
        {
            return _context.Hotels.FirstOrDefault(h => h.Id == hotelId);
        }

        public void Add(Hotel hotel)
        {
            _context.Add(hotel);
            _context.SaveChanges();
        }
        public void Update(Hotel hotel)
        {
            _context.Entry(hotel).State = EntityState.Modified;
            _context.SaveChanges();
        }
        public void Delete(int hotelId)
        {
            var hotel = GetHotelById(hotelId);

            _context.Hotels.Remove(hotel);
            _context.SaveChanges();
        }
    }
}
