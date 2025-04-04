# PCEquipmentStorage

📝 Test assignment for **RIIT** — a full-stack client-server application for managing computer equipment.

👨‍💻 Full-stack client-server application for managing computer equipment  
🧱 Tech Stack: .NET 8 + PostgreSQL + DevExtreme + Docker

---

## 🚀 Features

- Store and manage up to 2000 equipment records
- Unique card for each item with validation
- Equipment type selection from a dictionary (auto-filled on first run)
- Create, edit, sort, and filter records
- Modern client-server architecture deployed via Docker Stack

---

## 🛠️ Technology Stack

| Layer        | Technologies                         |
|--------------|--------------------------------------|
| Backend      | ASP.NET Core 8 Web API               |
| ORM          | Entity Framework Core + Migrations   |
| Database     | PostgreSQL 15                        |
| Frontend     | DevExtreme (JavaScript, jQuery)      |
| Deployment   | Docker, Docker Compose Stack         |

---

## 📦 Getting Started

1. **Clone the repository**

```bash
git clone https://github.com/Sang1n/PCEquipmentStorage.git
cd PCEquipmentStorage/PCEquipmentStorage
```

2. **Build app**

```bash
docker build -t pcstorage-app:latest .
```

3. **Deploy the stack**

```bash
cd ..
docker stack deploy -c docker-compose.yml pcstack
```

4. **Open in browser**

```bash
http://localhost:5000
```

⚙️ **Notes**
The record limit of 2000 is enforced in the controller layer for convenience during testing.
It can also be enforced directly in the database level using constraints or triggers.

The frontend and backend are implemented in the same solution and served from the wwwroot directory.
However, they can easily be separated into two standalone services for more flexibility (e.g., SPA with independent frontend hosting).

📌 **Constraints**
Max 2000 records in the Equipment table

Inventory number must be unique (up to 32 characters)

Equipment name: up to 256 characters

Room number: integer between 1 and 1000

Equipment type is selected from a predefined dictionary

👤 **Author**
Sangin
GitHub: github.com/Sang1n