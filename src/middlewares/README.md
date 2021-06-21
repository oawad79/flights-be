# [Middlewares](src/middlewares)

```js
export const validateQuery = (fields: string[]) => (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  for (const field of fields) {
    if (!req.query[field]) {
      return res.status(400).send(`${field} is missing`);
    }
  }
  next();
};
```

*Middleware* functions have access to the *request object* (__req__) and the *response object* (__res__), and the __next__ function during the application's request-response cycle. The example above simply checks that the query parameters in the *request object* contain the values in *fields*, before proceeding. The __next__ function executes the next middleware when invoked, in this case, the *controller*.
<br>Middleware functions can perform the following tasks:

- Execute any code.
- Make changes to the __req__ and the __res__ objects.
- End the request-response cycle.
- Proceed the next middleware in the stack.
