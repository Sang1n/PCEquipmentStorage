namespace PCEquipmentStorage.Models
{
    public class Equipment
    {
        public int Id { get; set; }

        public string InventoryNumber { get; set; } = "";
        public string Name { get; set; } = "";
        public int Room { get; set; }

        public int TypeId { get; set; }
        public EquipmentType? Type { get; set; }
    }

}
