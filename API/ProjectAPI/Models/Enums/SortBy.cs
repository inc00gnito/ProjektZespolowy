using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace ProjectAPI.Models.Enums
{
    public enum SortBy
    {
        CostLowToHigh = 0,
        CostHighToLow = 1,
        TimesSold = 2,
        DiscountedLowToHigh = 3,
        DiscountedHighToLow = 4,
    }
}
