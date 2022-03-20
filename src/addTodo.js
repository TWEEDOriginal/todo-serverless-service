const { v4 } = require('uuid')
const aws = require('aws-sdk')
const middy = require('@middy/core')
const httpJsonBodyParser = require('@middy/http-json-body-parser')
const { build_response } = require('./utils')

const add_todo = async (event) => {

    const dynamodb  = new aws.DynamoDB.DocumentClient()

    const {todo} = event.body

    const new_todo = {
        id: v4(),
        todo,
        created_at: new Date().toISOString(),
        completed: false,
        
    }

    return await dynamodb
    .put({
        TableName: 'TodoTable',
        Item: new_todo,
      })
    .promise()
    .then(
        () => {
          const body = {
            Operation: "SAVE",
            Message: "SUCCESS",
            Item: new_todo,
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
    handler: middy(add_todo).use(httpJsonBodyParser())
}