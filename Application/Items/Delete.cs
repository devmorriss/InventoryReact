using MediatR;
using Persistence;

namespace Application.Items
{
    public class Delete
    {
        public class Commad : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Commad>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;   
            }
            public async Task<Unit> Handle(Commad request, CancellationToken cancellationToken)
            {
                var item = await _context.Items.FindAsync(request.Id);

                _context.Remove(item);

                await _context.SaveChangesAsync();

                return Unit.Value;
            }
        }
    }
}