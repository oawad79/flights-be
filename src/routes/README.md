
# [Routes](src/routes)

```js
const router = Router();

router.get('/', validateQuery(['locale', 'productId']), controller.getProduct);
```
As seen above, no logic lives in the *routers*. The only responsibility of these *routers* is to chain the *route(s)* with the corresponding *controller(s)*. Middleware functions are also utilized in the routes shown above, in this case, to validate that certain query parameters are defined before forwarding the request to the appropriate *controller*.