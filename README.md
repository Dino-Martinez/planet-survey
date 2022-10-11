# Planet Survey

This project aims to offer a simple and easy solution to creating/distributing surveys, similar to Google Forms. This project was bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## TODO

- refactor frontend route protection into a Component
- make form creation the homepage (auth protected)
- implement error logger in db
- handle errors on frontend (specifically in the form responses view and the form view)
- fix weird bug where TRPC throws an error on submitForm (saying that formUserResponse.update() does not accept formUserResponseId, even though it's nested)
    - NOTE: this code *works* and correctly stores the data in db, but throws a TRPC error on client