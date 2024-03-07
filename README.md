# Applio API

## Table of Contents

- [About](#about)
  - [Terms of Use](#terms-of-use)
- [Setup](#setup)
  - [Installation](#installation)
  - [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Knowledge](#knowledge)
- [License](#license)

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

### Ping

```http
GET /ping
```

## Knowledge

- [Hono](https://github.com/honojs/hono)

## License

This project is licensed under the Attribution-NonCommercial 4.0 International license. See the [LICENSE](./LICENSE) file for details.
