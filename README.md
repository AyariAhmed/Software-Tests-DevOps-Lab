# Software Tests && Devops lab

### Database (Postgres)

Change the environment through `NODE_ENV` environment variable

- Development (Stateful: data will be persisted through Docker mount volume)

```bash
docker-compose up -d
```

> Both docker and docker-compose should be properly installed

- Production (hosted in heroku)

Provide a valid `DATABASE_URL` (postgres connection string) at `.env`,

```bash
 heroku config -a <heroku-app-name>
```

To get the DATABASE_URL (for free plan, credentials are not permanent )

## CI/CD workflows
- linter and formatter (Triggered on both api and www file changes)

![Screen Shot 2022-06-06 at 12 36 26 PM](https://user-images.githubusercontent.com/56363189/172153323-5c1fbd97-22e6-4fd2-b7a1-e002da112585.png)

- www deployment (Triggered on www changes)
![Screen Shot 2022-06-06 at 12 39 42 PM](https://user-images.githubusercontent.com/56363189/172153807-5965a351-27f2-44d0-b7e6-cea225c8d80f.png)

- api deployment (Triggered on api changes)

![Screen Shot 2022-06-06 at 12 38 58 PM](https://user-images.githubusercontent.com/56363189/172153677-6536a3a8-5c25-440d-b5e8-ee7787b4ca18.png)

