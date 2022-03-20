const { v4 } = require('uuid')
const aws = require('aws-sdk')
const { build_response } = require('./utils')

const fetch_todos = async (event) => {

    const dynamodb  = new aws.DynamoDB.DocumentClient()
    let result, statusCode

    try {
      const Items = await dynamodb.scan({
        TableName: 'TodoTable'
      }).promise()
     result = {
      Operation: "FETCH Items",
      Message: "SUCCESS",
      Items: Items.Items,
     }
     statusCode = 200
    }
    catch(e){
      console.log(e)
      result = {
        Operation: "FETCH Items",
        Message: "FAILED",
        error: String(e),
      }
      statusCode = 400
    }
    return build_response(statusCode, result);

    
}

module.exports = {
    handler: fetch_todos
}