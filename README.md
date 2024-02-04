`Development Version` `Version 2` 
![Applio API](https://github.com/IAHispano/Applio-API/assets/133521603/fdae2eaf-5fb9-447a-86dc-a741384f911c)
  
<h2> Installation </h2>

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

![Applio-API Performance Test](https://i.imgur.com/JNt8hIP.png)




