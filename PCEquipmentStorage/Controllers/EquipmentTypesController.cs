using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCEquipmentStorage.Models;

namespace PCEquipmentStorage.Controllers;

[ApiController]
[Route("equipment/types")]
public class EquipmentTypesController : ControllerBase
{
    private readonly AppDbContext _context;

    public EquipmentTypesController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var list = await _context.EquipmentTypes.ToListAsync();
        return Ok(list);
    }
}
