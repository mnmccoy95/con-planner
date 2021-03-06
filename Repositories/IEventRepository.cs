using con_planner.Models;
using System.Collections.Generic;

namespace con_planner.Repositories
{
    public interface IEventRepository
    {
        void Add(Event eventObj);
        void Delete(int eventId);
        List<Event> GetByUserId(int userId);
        Event GetEventById(int eventId);
        void Update(Event eventObj);
    }
}