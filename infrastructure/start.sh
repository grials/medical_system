# docker system prune -af
docker network create medical-system-network || true
docker volume rm local_mongo-data-vol-one || true

docker compose -f ./infrastructure/compose-kafka.yaml down 
docker compose -f ./infrastructure/compose-redis.yaml down 
docker compose -f ./infrastructure/traefik/compose.yaml down 
docker compose -f ./infrastructure/compose-mongo-db.yaml down 

docker compose -f ./infrastructure/compose-kafka.yaml up -d 
docker compose -f ./infrastructure/compose-redis.yaml up -d 
docker compose -f ./infrastructure/traefik/compose.yaml up -d 
docker compose -f ./infrastructure/compose-mongo-db.yaml up -d 
