using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Items
{
    public class List
    {
        public class Query : IRequest<List<Item>> {}

        public class Handler : IRequestHandler<Query, List<Item>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Item>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Items.ToListAsync();
            }
        }
    }
}