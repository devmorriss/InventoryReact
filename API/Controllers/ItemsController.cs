using Domain;
using Microsoft.AspNetCore.Mvc;
using Application.Items;

namespace API.Controllers
{
    public class ItemsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Item>>> GetItems()
        {
            return await Mediator.Send(new List.Query());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Item>> GetItem(Guid id)
        {
            return await Mediator.Send(new Details.Query{Id = id});
        }

        [HttpPost]
        public async Task<IActionResult> CreateItem(Item item)
        {
            return Ok(await Mediator.Send(new Create.Command {Item = item}));
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> EditItem(Guid id, Item item)
        {
            item.Id = id;
            return Ok(await Mediator.Send(new Edit.Command{Item = item}));
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItem(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Commad{Id = id}));
        }
    }
}