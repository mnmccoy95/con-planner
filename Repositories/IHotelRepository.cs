using con_planner.Models;

namespace con_planner.Repositories
{
    public interface IHotelRepository
    {
        void Add(Hotel hotel);
        void Delete(int hotelId);
        Hotel GetHotelById(int hotelId);
        void Update(Hotel hotel);
    }
}