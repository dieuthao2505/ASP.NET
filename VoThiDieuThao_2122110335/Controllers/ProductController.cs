using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VoThiDieuThao_2122110335.Data;
using VoThiDieuThao_2122110335.Model;

namespace VoThiDieuThao_2122110335.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductController(AppDbContext context)
        {
            _context = context;
        }
        // POST: api/Product (Thêm sản phẩm mới với ảnh)




        // GET: api/Product (Lấy danh sách sản phẩm)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> Get()
        {
            return await _context.Products.ToListAsync();
        }

        // GET: api/Product/5 (Lấy sản phẩm theo ID)
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }
            return Ok(product);
        }

        // POST: api/Product (Thêm sản phẩm mới)
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Product product)
        {
            if (product == null)
            {
                return BadRequest();
            }

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = product.Id }, product);
        }

        // PUT: api/Product/5 (Cập nhật sản phẩm)
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] Product product)
        {
            if (id != product.Id)
            {
                return BadRequest("ID không khớp");
            }

            _context.Entry(product).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.Products.Any(e => e.Id == id))
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

        // DELETE: api/Product/5 (Xóa sản phẩm)
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null)
            {
                return NotFound();
            }

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        // Upload hình ảnh cho sản phẩm
        [Authorize(Policy = "AdminPolicy")]
        [HttpPut("{id}/image")]
        public async Task<IActionResult> UpdateProductImage(int id, IFormFile image)
        {
            if (image == null || image.Length == 0)
            {
                return BadRequest("No image uploaded.");
            }

            var product = await _context.Products.FirstOrDefaultAsync(p => p.Id == id);
            if (product == null)
            {
                return NotFound(new { message = "Product not found" });
            }

            // Save file into wwwroot/images
            var fileName = Path.GetFileName(image.FileName);
            var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");

            Directory.CreateDirectory(uploadPath); // Create directory if it doesn't exist

            var filePath = Path.Combine(uploadPath, fileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }

            // Update image path in the database
            product.Image = "/images/" + fileName;
            _context.Products.Update(product);
            await _context.SaveChangesAsync();

            // Trả về thông tin sản phẩm đã cập nhật
            return Ok(product); // Trả về đối tượng Product, không cần DTO
        }

        // Lấy hình ảnh của sản phẩm
        [HttpGet("{id}/image")]
        public async Task<IActionResult> GetProductImage(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null || string.IsNullOrEmpty(product.Image))
            {
                return NotFound("Product or image not found");
            }

            var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", product.Image.TrimStart('/'));

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound("Image file not found");
            }

            var imageBytes = await System.IO.File.ReadAllBytesAsync(filePath);
            var contentType = "image/" + Path.GetExtension(filePath).Trim('.'); // Ví dụ: image/jpg, image/png

            return File(imageBytes, contentType);
        }
    }
    }

