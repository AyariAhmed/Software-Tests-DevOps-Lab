# Software Tests && Devops lab

### Database (Postgres)

Change the environment through `NODE_ENV` environment variable

- Development (Stateful: data will be persisted through Docker mount volume)

```bash
docker-compose up -d
```

> Both docker and docker-compose should be properly installed

- Production (hosted in heroku)

> Provide a valid `DATABASE_URL` (postgres connection string) at `.env`, run: heroku config -a <heroku-app-name> to get the DATABASE_URL (for free plan, credentials are not permanent )
