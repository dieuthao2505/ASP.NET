using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoThiDieuThao_2122110335.Data;
using VoThiDieuThao_2122110335.Model;

namespace VoThiDieuThao_2122110335.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : Controller
    {
        // GET: CardController
        private readonly AppDbContext _context;

        public CardController(AppDbContext context)
        {
            _context = context;
        }

        // POST: api/Card (Thêm thẻ mới)
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Card card)
        {
            if (card == null)
            {
                return BadRequest();
            }

            _context.Cards.Add(card);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCard), new { id = card.Id }, card);
        }

        // GET: api/Card/{userId} (Lấy thẻ của người dùng theo UserId)
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<Card>>> GetCard(int userId)
        {
            var cards = await _context.Cards.Where(c => c.UserId == userId).ToListAsync();
            if (cards == null || cards.Count == 0)
            {
                return NotFound();
            }

            return Ok(cards);
        }

        // GET: api/Card/5 (Lấy thẻ theo ID)
        [HttpGet("{id}")]
        public async Task<ActionResult<Card>> GetCardById(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            return Ok(card);
        }

        // DELETE: api/Card/5 (Xóa thẻ)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var card = await _context.Cards.FindAsync(id);
            if (card == null)
            {
                return NotFound();
            }

            _context.Cards.Remove(card);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    
    }
    
}
