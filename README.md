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

### Dockerized App

- Multi stage docker build is used to build the nestjs application and only include the build and config into the image.
- To manually build and run the docker image

```bash
docker build -t tests-devops-lab .
docker run --env-file=.env -p 3000:3000 --rm tests-devops-lab
```

### CI/CD workflows

- linter and formatter (Triggered on both api and www changes)

![Screen Shot 2022-06-06 at 12 36 26 PM](https://user-images.githubusercontent.com/56363189/172153323-5c1fbd97-22e6-4fd2-b7a1-e002da112585.png)

- www deployment (Triggered on www changes)

![Screen Shot 2022-06-06 at 12 41 09 PM](https://user-images.githubusercontent.com/56363189/172154026-842e2e9e-177e-4d95-9218-c8e2fe3d11d7.png)

- api deployment (Triggered on api changes)

![Screen Shot 2022-06-06 at 12 38 58 PM](https://user-images.githubusercontent.com/56363189/172153677-6536a3a8-5c25-440d-b5e8-ee7787b4ca18.png)
