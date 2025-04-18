using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoThiDieuThao_2122110335.Data;
using VoThiDieuThao_2122110335.Model;

namespace VoThiDieuThao_2122110335.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : Controller
    {
        private readonly AppDbContext _context;

        public OrderDetailController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/OrderDetail
        [HttpGet]
        public async Task<ActionResult<IEnumerable<OrderDetail>>> Get()
        {
            return await _context.OrderDetails
                                 .Include(od => od.Product)
                                 .Include(od => od.Order)
                                 .ToListAsync();
        }

        // GET: api/OrderDetail/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrderDetailById(int id) // <-- sửa tên hàm nè
        {
            var orderDetail = await _context.OrderDetails
                                            .Include(od => od.Product)
                                            .Include(od => od.Order)
                                            .FirstOrDefaultAsync(od => od.Id == id);

            if (orderDetail == null)
            {
                return NotFound();
            }
            return Ok(orderDetail);
        }

        // POST: api/OrderDetail
        [HttpPost]
        public async Task<IActionResult> CreateOrderDetail([FromBody] OrderDetail orderDetail)
        {
            if (orderDetail == null)
            {
                return BadRequest("Invalid data.");
            }

            // Kiểm tra nếu OrderId và ProductId tồn tại trong cơ sở dữ liệu
            var order = await _context.Orders.FindAsync(orderDetail.OrderId);
            var product = await _context.Products.FindAsync(orderDetail.ProductId);

            if (order == null || product == null)
            {
                return NotFound("Order or Product not found.");
            }

            _context.OrderDetails.Add(orderDetail);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderDetailById), new { id = orderDetail.Id }, orderDetail); // <-- sửa chỗ này luôn
        }

        // PUT: api/OrderDetail/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] OrderDetail orderDetail)
        {
            if (id != orderDetail.Id)
            {
                return BadRequest("ID không khớp");
            }

            _context.Entry(orderDetail).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.OrderDetails.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/OrderDetail/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var orderDetail = await _context.OrderDetails.FindAsync(id);
            if (orderDetail == null)
            {
                return NotFound();
            }

            _context.OrderDetails.Remove(orderDetail);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
