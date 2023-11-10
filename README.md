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
GET https://api.applio.org/key=(secret)/models/perpage=(number)/page=(number)?type=(kits.ai / rvc)
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `perpage`  | `number` | **Required**. Number of models to view (max 25). |
| `page`  | `number` | **Required**. Page number to be displayed |
| `type`  | `string` | Optional. Type of model to fetch |



### Search Models

Search for specific models by name using the following API endpoint:

```http
GET https://api.applio.org/key=(secret)/models/search?name=(model_name)&type=(kits.ai / rvc)
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `search`      | `string` | **Required**. Name of model to fetch (min 3 letters). |
| `type`      | `string` | Optional. Type of model to fetch |



### Search User Models

To find specific models based on their associated usernames:

```http
GET https://api.applio.org/key=(secret)/models/user=(username)?type=(kits.ai / rvc)
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `user`  | `string` | **Required**. User owner of the models you want to see (min 3 letters).  |
| `type`      | `string` | Optional. Type of model to fetch |


### Generate an API KEY

Generate a user API KEY, you must have an administrator API KEY.

```http
POST https://api.applio.org/key=(secret)/generateToken
```

| Parameter  | Type     | Description                            |
| :--------- | :------- | :------------------------------------- |
| `key`  | `string` | **Required**. This action requires an ADMIN API KEY for authorization. |


### Check API Status

Check the latency of the API.

```http
GET https://api.applio.org/ping
```

Make sure to replace `(secret)` in the API endpoints with your actual API KEY to authenticate your requests.


## Performance Testing

In the table below, you will find the results of our performance tests for the Applio API. We run these tests with every new release, and you can access all the logs here:


| Request Count | Response Time | Version          |
| ------------- | ------------------------| -----------------|
| 100           | 1.0s                  | Beta      |
| 250           | 1.1s                      | Beta      |
| 500           | 1.4s                      | Beta      |
| 1000          | 1.6s                      | Beta    |


#### Attempts to scrape data from our API are strictly prohibited.

<p align="center">
    <img src="https://docs.applio.org/assets/applio.png" alt="applio" />
</p>



