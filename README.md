`Development Branch` `Test Version` 

![Applio API](https://github.com/IAHispano/Applio-API/assets/133521603/fdae2eaf-5fb9-447a-86dc-a741384f911c)


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

# API Reference

## Information

### Get API status

Check the latency of the API.

```http
GET /ping
```

## Models

### Get all models

Retrieve information about multiple models using models API endpoint:

```http
GET /models?page=(page)&max=(perpage)
```

Note that the models must be in json in the `models` folder.

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `perpage`  | `number` | **Required**. Number of models to view (max 20). |
| `page`  | `number` | **Required**. Page number to be displayed. |

### Search a model

Retrieve information about multiple models using models API endpoint:

```http
GET /models?page=(page)&max=(perpage)?search=(search)
```

Note that the models must be in json in the `models` folder.

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `perpage`  | `number` | **Required**. Number of models to view (max 20). |
| `page`  | `number` | **Required**. Page number to be displayed. |
| `search`  | `string` | Search for a model by name. |

## Performance Testing

![Applio-API Performance Test](https://i.imgur.com/JNt8hIP.png)




