![Applio API Image](https://github.com/IAHispano/Applio-API/assets/133521603/a938534e-1335-4d3f-919f-83fca6c301a9)

## Table of Contents

- [Todo](#todo)
- [About](#about)
  - [Terms of Use](#terms-of-use)
- [Setup](#setup)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [Ping](#ping)
  - [Models](#models)
  - [Users](#users)
  - [Blogs](#blogs)
  - [Guides](#guides)
  - [Upload](#upload)
- [Knowledge](#knowledge)
- [License](#license)

## Todo

> [!WARNING]
> The current branch you are in is still under development and is unstable.

- [ ] Add filters at all serivces

## About

The Applio API offers robust functionality, focused on granting convenient access to AI models developed using the RVC technology. It serves as the backbone for the operations of the applio.org website.

### Terms of Use

This API is designated for non-commercial purposes exclusively. For inquiries related to commercial utilization, kindly reach out to us at [iahispano0@gmail.com](mailto:iahispano0@gmail.com). Any attempts to scrape data from our API are strictly prohibited.

## Setup

### Installation

```sh
bun install
```

Please rename `.env.example` to `.env` and provide the necessary environment variables.

### Usage

```sh
bun run dev
```

Access http://localhost:3000 in your browser.

## API Endpoints

### Warning

```http
GET *
```

| Header | Required | Default | Value | Description |
| ------ | -------- | ------- | ----- | ----------- |
| `Authorization  ` | True    | None      | String | Your API KEY. |

You must generate your API KEY at https://applio.org/api.

### Ping

```http
GET /ping
```

### Models

```http
GET /models
```

#### Parameters


| Header | Required | Default | Value | Description |
| ------ | -------- | ------- | ----- | ----------- |
| `perPage  ` | False    | 20      | Number (1 to 20) | Number of blogs to view per page. |
| `page`    | False    | 1       | Number (1 to 20858) | Page number to be displayed.         |
| `name`    | False    | None       | String | Name of the model you want to find.         |
| `type`    | False    | None       | String | Type of models you want to see.        |
| `createdBy`    | False    | None       | String | Find models by author username.        |

### Users

```http
GET /users
```

#### Parameters

| Header     | Required | Default | Value               | Description                            |
| ---------- | -------- | ------- | ------------------- | -------------------------------------- |
| `perPage`  | False    | 20      | Number (1 to 20)    | Number of profiles to view per page.   |
| `page`     | False    | 1       | Number (1 to 20858) | Page number to be displayed.           |
| `username` | False    | None    | String              | Username of the user you want to find. |

### Blogs

```http
GET /blogs
```

#### Parameters

| Header    | Required | Default | Value            | Description                        |
| --------- | -------- | ------- | ---------------- | ---------------------------------- |
| `perPage` | False    | 20      | Number (1 to 20) | Number of blogs to view per page.  |
| `page`    | False    | 1       | Number (1)       | Page number to be displayed.       |
| `title`   | False    | None    | String           | Name of the blog you want to find. |

### Guides

```http
GET /guides
```

#### Parameters

| Header    | Required | Default | Value            | Description                         |
| --------- | -------- | ------- | ---------------- | ----------------------------------- |
| `perPage` | False    | 20      | Number (1 to 20) | Number of blogs to view per page.   |
| `page`    | False    | 1       | Number (1)       | Page number to be displayed.        |
| `title`   | False    | None    | String           | Name of the guide you want to find. |

### Upload

```http
GET /upload
```

#### Parameters

| Header           | Required | Default | Value  | Description           |
| ---------------- | -------- | ------- | ------ | --------------------- |
| `id`             | true     | None    | Number | Model ID              |
| `name`           | true     | None    | String | Model name            |
| `link`           | true     | None    | String | Model link            |
| `image`          | true     | None    | String | Model image url       |
| `type`           | true     | None    | String | Model type            |
| `epochs`         | true     | None    | Number | Model epochs          |
| `createdAt`      | true     | None    | Any    | Model created at date |
| `algorithm`      | true     | None    | String | Model algorithm       |
| `authorId`       | true     | None    | String | Author ID             |
| `authorUsername` | true     | None    | String | Author username       |

## Knowledge

- [Hono](https://github.com/honojs/hono)

## License

This project is licensed under the Attribution-NonCommercial 4.0 International license. See the [LICENSE](./LICENSE) file for details.
