.PHONY: all up down clean rebuild logs ps

up:
	docker compose up -d --build

down:
	docker compose down

fclean:
	docker compose down -v --remove-orphans
	docker system prune -f

re: fclean up

re-backend:
	docker compose stop backend
	docker compose up -d --build backend

re-frontend:
	docker compose stop frontend
	docker compose up -d --build frontend

# Reset database
db-reset:
	docker compose stop mongodb
	docker volume rm docker-setup_mongo_data 2>/dev/null || true
	docker compose up -d mongodb

# Logs
logs:
	docker compose logs -f

lf:
	docker logs frontend

lb:
	docker logs backend

ld:
	docker logs mongodb

ps:
	docker compose ps
