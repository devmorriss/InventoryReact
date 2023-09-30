using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if(context.Items.Any()) return;

            var items = new List<Item>
            {
                new Item
                {
                    Name = "Bag",
                    Price = 599,
                    Description = "Red coloured bag.",
                    DateCreated = DateTime.Now
                },
                new Item
                {
                    Name = "Phone Case",
                    Price = 150,
                    Description = "Blue phone case.",
                    DateCreated = DateTime.Now
                },
                new Item
                {
                    Name = "Earphones",
                    Price = 1099.21,
                    Description = "Generic brand earphones.",
                    DateCreated = DateTime.Now
                },
            };

            await context.Items.AddRangeAsync(items);
            await context.SaveChangesAsync();
        }
    }
}