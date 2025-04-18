using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VoThiDieuThao_2122110335.Data;
using Microsoft.EntityFrameworkCore;

using VoThiDieuThao_2122110335.Model;
using Microsoft.AspNetCore.Authorization;

namespace VoThiDieuThao_2122110335.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly AppDbContext _context;
        //private readonly string _secretKey = "your_secret_key_here";  // Khóa bí mật dùng để tạo JWT token
        private readonly string _issuer = "yourIssuer"; // thêm
        private readonly string _audience = "yourAudience"; // thêm
        private readonly string _secretKey = "yourSecretKey";



        //public UserController(AppDbContext context)
        //{
        //    _context = context;
        //}

        //// API đăng ký người dùng (POST)
        //[HttpPost("register")]
        //public async Task<ActionResult<User>> Register([FromBody] User user)
        //{
        //    _context.Users.Add(user);
        //    await _context.SaveChangesAsync();
        //    return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        //}

        //// API đăng nhập người dùng và trả về JWT token
        //[HttpPost("login")]
        //public async Task<ActionResult<string>> Login([FromBody] LoginModel loginModel)
        //{
        //    var user = await _context.Users
        //        .Where(u => u.Username == loginModel.Username && u.Password == loginModel.Password)
        //        .FirstOrDefaultAsync();

        //    if (user == null)
        //    {
        //        return Unauthorized("Invalid credentials");
        //    }

        //    var token = GenerateJwtToken(user);
        //    return Ok(new { Token = token });
        //}
        //// GET api/User
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        //{
        //    return await _context.Users.ToListAsync();
        //}


        //// Tạo JWT token
        //private string GenerateJwtToken(User user)
        //{
        //    var claims = new[]
        //    {
        //        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //        new Claim(ClaimTypes.Name, user.Username),
        //        new Claim(ClaimTypes.Role, user.Role),
        //    };

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        //    var token = new JwtSecurityToken(
        //        claims: claims,
        //        expires: DateTime.Now.AddDays(1),  // Token sẽ hết hạn sau 1 ngày
        //        signingCredentials: creds
        //    );

        //    return new JwtSecurityTokenHandler().WriteToken(token);
        //}

        //// GET api/User/5
        //[HttpGet("{id}")]
        //public async Task<ActionResult<User>> GetUser(int id)
        //{
        //    var user = await _context.Users.FindAsync(id);

        //    if (user == null)
        //    {
        //        return NotFound();
        //    }

        //    return user;
        //}
        ///////////////////////////////////
        public UserController(AppDbContext context)
    {
        _context = context;
    }

    // API đăng ký người dùng (POST)
    [HttpPost("register")]
    public async Task<ActionResult<User>> Register([FromBody] User user)
    {
        _context.Users.Add(user);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
    }

    // API đăng nhập người dùng và trả về JWT token
    [HttpPost("login")]
    public async Task<ActionResult<string>> Login([FromBody] LoginModel loginModel)
    {
        var user = await _context.Users
            .Where(u => u.Username == loginModel.Username && u.Password == loginModel.Password)
            .FirstOrDefaultAsync();

        if (user == null)
        {
            return Unauthorized("Invalid credentials");
        }

        var token = GenerateJwtToken(user);
        return Ok(new { Token = token });
    }

    // API để kiểm tra quyền Admin
    [Authorize(Roles = "Admin")]
    [HttpGet("admin-welcome")]
    public ActionResult<string> GetAdminWelcome()
    {
        return Ok("Welcome Admin");
    }

    // Tạo JWT token
    private string GenerateJwtToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role),  // Lưu vai trò của người dùng vào token
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,                // <<< thêm vào
            audience: _audience,
            claims: claims,
            expires: DateTime.Now.AddDays(1),  // Token sẽ hết hạn sau 1 ngày
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    // GET api/User/5
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }


}
    public class LoginModel
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
 