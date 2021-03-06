using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class ItemRepository : IItemRepository
    {
        private ApplicationDbContext _context;

        public ItemRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Item GetItemById(int itemId)
        {
            return _context.Items.FirstOrDefault(c => c.Id == itemId);
        }

        public void Add(Item item)
        {
            _context.Add(item);
            _context.SaveChanges();
        }

        public void Update(Item item)
        {
            _context.Entry(item).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int itemId)
        {
            var item = GetItemById(itemId);

            _context.Items.Remove(item);
            _context.SaveChanges();
        }
    }
}
