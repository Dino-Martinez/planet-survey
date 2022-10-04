# Planet Survey

This project aims to offer a simple and easy solution to creating/distributing surveys, similar to Google Forms. This project was bootstrapped according to the [init.tips](https://init.tips) stack, also known as the T3-Stack.

## TODO

- replace authTest.tsx with an actual login solution
- change db query to only populate one avatar per user 
    - this is gonna be solved by having FormUserResponse include many Responses (which should be renamed to InputResponse)
- create some form of navbar 
- make form creation the homepage (auth protected)
- make forms themselves be only available via link (no navigation on-site)
- make form responses only viewable by the form author