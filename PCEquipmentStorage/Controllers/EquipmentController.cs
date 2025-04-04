using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PCEquipmentStorage.Models;

namespace PCEquipmentStorage.Controllers;

[ApiController]
[Route("equipment")]
public class EquipmentController : ControllerBase
{
    private readonly AppDbContext _context;

    public EquipmentController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        var list = await _context.Equipment
            .Include(e => e.Type)
            .ToListAsync();
        return Ok(list);
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] Equipment model)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var count = await _context.Equipment.CountAsync();
        if (count >= 2000)
            return BadRequest("Превышено максимальное количество записей (2000).");

        _context.Equipment.Add(model);
        await _context.SaveChangesAsync();

        return Ok(model);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] Equipment model)
    {
        var existing = await _context.Equipment.FindAsync(id);
        if (existing == null) return NotFound();

        existing.InventoryNumber = model.InventoryNumber;
        existing.Name = model.Name;
        existing.Room = model.Room;
        existing.TypeId = model.TypeId;

        await _context.SaveChangesAsync();
        return Ok(existing);
    }
}
