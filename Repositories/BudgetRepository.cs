using con_planner.Data;
using con_planner.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace con_planner.Repositories
{
    public class BudgetRepository : IBudgetRepository
    {
        private ApplicationDbContext _context;

        public BudgetRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public Budget GetBudgetById(int budgetId)
        {
            return _context.Budgets.FirstOrDefault(b => b.Id == budgetId);
        }

        public void Add(Budget budget)
        {
            _context.Add(budget);
            _context.SaveChanges();
        }
        public void Update(Budget budget)
        {
            _context.Entry(budget).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Delete(int budgetId)
        {
            var budget = GetBudgetById(budgetId);

            _context.Budgets.Remove(budget);
            _context.SaveChanges();
        }
    }
}
