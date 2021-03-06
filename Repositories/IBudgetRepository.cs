using con_planner.Models;

namespace con_planner.Repositories
{
    public interface IBudgetRepository
    {
        void Add(Budget budget);
        void Delete(int budgetId);
        Budget GetBudgetById(int budgetId);
        void Update(Budget budget);
    }
}