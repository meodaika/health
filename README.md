# Health Application

A application manage health.

- User can read articles about health care methods, nutrition.
- Users can create personal information including Diary, Excercise and Body Index. A statistic chart will show the change in body through each period.
- A feature Reminder notification will remind you about time if you forgot do excercise or have meal. User can set schedule to be reminded, it is depend on personal timetable.

## Features

- Authentication
- MVC Architecture
- Cache data
- Reminder notification for excercises, meals. User is setted default with 3 time to notify when must have meal : Morning ( breakfast ) : 7h00 , Lunch : 12h00, and Dinner : 19h00. At that time, app will open pop up to remind user. Aside , user can custom time for excercise whenever they want.

## FIX

- Can not upload ( missing thumbnail folder )
- Show thumbnail photo url

## Tech Stack

**Cache:** Redis

**Server:** Express ( Typescript ), TypeORM, Postgres

**Socket :** SocketIO

## Roadmap

- ~~Build code base~~
- ~~User and Authentication~~
- ~~Blog~~
- ~~Diary~~
- ~~Excercise~~
- ~~Records ( Body index) filter by day, week, month or year~~
- ~~Meal~~
- ~~Reminder notification~~

## Installation

Install my-project with npm

```bash
  cp example.env .env
  yarn
  yarn dev
```

and init test data :

```bash
  yarn seed

```

## Use

Document with Swagger is available at :

http://localhost:8080/docs/
