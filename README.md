# FoodiMap - REST API
### Start Postgres Database:
```bash
docker-compose up
```

### Routes guarding based on roles
* import AuthModule in the module where routes guarding is being used
* Exemples:
```ts
  @hasRoles(UserRole.CLIENT,UserRole.ADMIN)
  @UseGuards(JwtAuthGuard,RolesGuard)
```
only client or admin can access the protected resource
```ts
  @hasRoles(UserRole.OWNER)
  @UseGuards(JwtAuthGuard,RolesGuard)
```
only owner can access the protected resource

