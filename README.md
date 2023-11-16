# Applio API

Welcome to the Applio API, your gateway to a vast repository of more than 20,000 RVC models and over 500,000 kits.ai components.


## Installation

To get started with the Applio API, follow these simple installation steps:

1. Install Applio-API using npm:

```bash
npm install
```

2. Start the API with the following command:

```bash
npm run dev
```

## API Reference

### Get All Models

Retrieve information about multiple models using the following API endpoint:

```http
GET /key=(secret)/models/perpage=(number)/page=(number)?type=(kits.ai / rvc)
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `perpage`  | `number` | **Required**. Number of models to view (max 25). |
| `page`  | `number` | **Required**. Page number to be displayed |
| `type`  | `string` | Optional. Type of model to fetch |



### Search Models

Search for specific models by name using the following API endpoint:

```http
GET /key=(secret)/models/search?name=(model_name)&type=(kits.ai / rvc)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `search`      | `string` | **Required**. Name of model to fetch (min 3 letters). |
| `type`      | `string` | Optional. Type of model to fetch |



### Search User Models

To find specific models based on their associated usernames:

```http
GET /key=(secret)/models/user=(username)?type=(kits.ai / rvc)
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `user`  | `string` | **Required**. User owner of the models you want to see (min 3 letters).  |
| `type`      | `string` | Optional. Type of model to fetch |


### Generate an API KEY

Generate a user API KEY, you must have an administrator API KEY.

```http
POST /key=(secret)/generateToken
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `key`  | `string` | **Required**. This action requires an ADMIN API KEY for authorization. |


### Upload Model

Upload a model, you must have an administrator API KEY.

```http
POST /key=(secret)/upload/:id/:name/:link/:image_url/:type/:epochs/:created_at/:algorithm/:author_id/:author_username
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `key`  | `string` | **Required**. This action requires an ADMIN API KEY for authorization. |
| `id` | `string` | **Required**. Unique identifier for the model. |
| `name` | `string` | **Required**. Name of the model. |
| `link` | `string` | **Required**. Link associated with the model. |
| `image_url` | `string` | **Required**. URL of the model's image. |
| `type` | `string` | **Required**. Type of the model. |
| `epochs` | `string` | **Required**. Number of epochs for the model. |
| `created_at` | `string` | **Required**. Creation date of the model. |
| `algorithm` | `string` | **Required**. Algorithm used by the model. |
| `author_id` | `string` | **Required**. Identifier of the model's author. |
| `author_username` | `string` | **Required**. Username of the model's author. |



### Check API Status

Check the latency of the API.

```http
GET /ping
```

Make sure to replace `(secret)` in the API endpoints with your actual API KEY to authenticate your requests.


## Performance Testing

In the table below, you will find the results of our performance tests for the Applio API. We run these tests with every new release, and you can access all the logs here:


| Request Count | Response Time | Version          |
| ------------- | ------------------------| -----------------|
| 100           | 1.0s                      | Beta      |
| 250           | 1.1s                      | Beta      |
| 500           | 1.4s                      | Beta      |
| 1000          | 1.6s                      | Beta    |
| 100           | 0.3s                      | 1.0     |
| 250           | 0.5s                      | 1.0        |
| 500           | 0.9s                      | 1.0       |
| 1000          | 1.3s                      | 1.0      |


#### Attempts to scrape data from our API are strictly prohibited.

<p align="center">
    <img src="https://docs.applio.org/assets/applio.png" alt="applio" />
</p>



