const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = "items";

module.exports.create = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: "items",
      Item: body,
    };
    await dynamo.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item created successfully" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};

module.exports.read = async (event) => {
  try {
    const params = {
      TableName: "items",
      Key: { id: event.pathParameters.id },
    };
    const result = await dynamo.get(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Item) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};

module.exports.update = async (event) => {
  try {
    const body = JSON.parse(event.body);
    const params = {
      TableName: "items",
      Key: { id: event.pathParameters.id },
      UpdateExpression: "set #n = :name",
      ExpressionAttributeNames: { "#n": "name" },
      ExpressionAttributeValues: { ":name": body.name },
      ReturnValues: "UPDATED_NEW",
    };
    const result = await dynamo.update(params).promise();
    return { statusCode: 200, body: JSON.stringify(result.Attributes) };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};

module.exports.delete = async (event) => {
  try {
    const params = {
      TableName: "items",
      Key: { id: event.pathParameters.id },
    };
    await dynamo.delete(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Item deleted successfully" }),
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify(error) };
  }
};
