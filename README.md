# Applio API (Development branch)

## Installation

To get started with the Applio API, follow these simple installation steps:

1. Install Applio-API using bun:

```bash
bun install
```

2. Start the API with the following command:

```bash
bun run dev
```

## API Reference

### Check API status

Check the latency of the API.

```http
GET /ping
```

### Get all models

Retrieve information about multiple models using the following API endpoint:

```http
GET /models?page=(page)&max=(perpage)
```

Note that the models must be in json in the `models` folder.

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `perpage`  | `number` | **Required**. Number of models to view (max 20). |
| `page`  | `number` | **Required**. Page number to be displayed |

## Performance Testing

![Applio-API Performance Test](https://i.imgur.com/bBhy9qQ.png)




