using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoThiDieuThao_2122110335.Data;
using VoThiDieuThao_2122110335.Model;

namespace VoThiDieuThao_2122110335.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Category
        // Lấy danh sách tất cả danh mục
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return await _context.Categories.ToListAsync();
        }

        // GET: api/Category/5
        // Lấy thông tin danh mục theo ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);

            if (category == null)
            {
                return NotFound(); // Trả về 404 nếu không tìm thấy
            }

            return category;
        }

        // POST: api/Category
        // Thêm mới danh mục
        [HttpPost]
        public async Task<ActionResult<Category>> PostCategory([FromBody] Category category)
        {
            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCategory), new { id = category.Id }, category);
        }

        // PUT: api/Category/5
        // Cập nhật thông tin danh mục
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory(int id, [FromBody] Category category)
        {
            if (id != category.Id)
            {
                return BadRequest(); // Trả về lỗi nếu ID không khớp
            }

            _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CategoryExists(id))
                {
                    return NotFound(); // Nếu không tìm thấy thì trả về lỗi 404
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Thành công nhưng không trả dữ liệu
        }

        // DELETE: api/Category/5
        // Xóa danh mục theo ID
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null)
            {
                return NotFound(); // Không tìm thấy danh mục
            }

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return NoContent(); // Trả về 204
        }

        // Kiểm tra danh mục có tồn tại không
        private bool CategoryExists(int id)
        {
            return _context.Categories.Any(e => e.Id == id);
        }
    }
}
