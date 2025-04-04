# --- Этап сборки ---
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /app

# Копируем csproj и восстанавливаем зависимости
COPY *.csproj .
RUN dotnet restore

# Копируем всё остальное и публикуем
COPY . .
RUN dotnet publish -c Release -o out

# --- Этап запуска ---
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /app

# Копируем собранный код из предыдущего этапа
COPY --from=build /app/out .

# Открываем порт
EXPOSE 5000

# Устанавливаем адрес, по которому приложение будет слушать
ENV ASPNETCORE_URLS=http://+:5000

# Точка входа
ENTRYPOINT ["dotnet", "PCEquipmentStorage.dll"]
