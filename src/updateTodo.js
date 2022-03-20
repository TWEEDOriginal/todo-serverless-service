const { v4 } = require('uuid')
const aws = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const { build_response } = require('./utils')

const update_todo = async (event) => {

    const dynamodb  = new aws.DynamoDB.DocumentClient()
    const {id} = event.pathParameters
    const {completed} = event.body
    

    return await dynamodb
    .update({
        TableName: 'TodoTable',
        Key: {
            id,
          },
          UpdateExpression: `set completed = :value`,
          ExpressionAttributeValues: {
            ":value": completed,
          },
          ReturnValues: "UPDATED_NEW",
      })
    .promise()
    .then(
        (response) => {
          const body = {
            Operation: "SAVE",
            Message: "SUCCESS",
            UpdatedAttributes: response,
          };
          return build_response(201, body);
        },
        (error) => {
          console.error(
            "Do your custom error handling here. I am just gonna log it: ",
            error
          );
        }
      );

}

module.exports = {
    handler: middy(update_todo).use(httpJsonBodyParser())

}