# Conway's Game of Life

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

Live Demo Link: []()

This project is a simple Sign-up and Login flow implementation of an E-commerce website. It uses NextJS 14, Next App Router, Tailwind CSS, TypeScript, Prisma as ORM, Neontech as online PostgreSQL DB. It does NOT use tRPC for API endpoints. Instead, I have written the APIs normally in Next.js and called them using axios. This is 2 of 2 Questions given to me as Roc8 Moonshot. The Question is as follows:

Q2. Develop a simple sign-up and login flow for an e-commerce website where users are able to mark the categories that they are interested in. Design Link: [https://www.figma.com/file/EjNZkDNTTgERV5PgF0mxnt/MERN-Assignment? type=design&node-id=33%3A667&mode=design&t=6k9G/DcswPavM0TD-1](https://www.figma.com/file/EjNZkDNTtgERV5PgF0mxnt/MERN-Assignment?type=design&node-id=33%3A667&mode=design&t=6k9GiDcswPavM0TD-1) You will see 4 screens in the design. First 2 are for the registration of new users, the third one is for the login of an existing user and the 4th one is a protected page that only logged in users can access. On this protected page, users see a list of categories that we have in our database (you can use faker to generate this data - [https://fakerjs.dev/](https://fakerjs.dev/)). Create 100 entries for the categories in your database using faker. Users can mark the categories that they are interested in. This is a paginated list where only 6 categories are visible at a time. Users can interact with pagination to see categories on various pages. Users should be able to see what categories they selected when they logout and login again. So we should store what they check in our database. The header is common for all the pages. The header should be static for the scope of this assignment and should not have any interactions like menus flying out.

## Setup and Installation

First, clone the repository to your local machine:

```bash
git clone https://github.com/DeeptaraghRoy/roc8careers-moonshot-ecomm.git
```

## Navigate into the project directory:

```bash
cd roc8careers-moonshot-ecomm
```

## Install the project dependencies:

```bash
npm install
```

OR, to install while disabling protection

```bash
npm install --force
```

## To start the project in local machine:

1. Rename the .env_sample file to .env
2. Enter values for the .env variables and save the file. (You can include any online PostgreSQL URL for which you have created your account)
3. Run the following commands one by one:
```bash
node prisma/seed.cjs
```
```bash
npm run dev
```

The application should now be locally hosted on http://localhost:3000.

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Contributing

If you want to contribute to this project, you're always welcome! Please fork the repository and create a pull request with your changes.