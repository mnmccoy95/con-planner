using con_planner.Models;
using System.Collections.Generic;

namespace con_planner.Repositories
{
    public interface ICosplayRepository
    {
        void Add(Cosplay cosplay);
        void Delete(int cosplayId);
        List<Cosplay> GetByUserId(int userId);
        Cosplay GetCosplayById(int cosplayId);
        void Update(Cosplay cosplay);
    }
}