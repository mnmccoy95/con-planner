using con_planner.Models;

namespace con_planner.Repositories
{
    public interface IItemRepository
    {
        void Add(Item item);
        void Delete(int itemId);
        Item GetItemById(int itemId);
        void Update(Item item);
    }
}