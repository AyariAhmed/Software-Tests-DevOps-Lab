# Software Tests && Devops lab

- Spin up development database (Postgres)

```bash
docker-compose up -d
```

> Both docker and docker-compose should be properly installed

- Production database is hosted on Heroku

> Provide a valid `DATABASE_URL` (postgres connection string) at `.env`
