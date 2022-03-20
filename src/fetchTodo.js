const { v4 } = require('uuid')
const aws = require('aws-sdk')
const { build_response } = require('./utils')

const fetch_todos = async (event) => {
    
    const dynamodb  = new aws.DynamoDB.DocumentClient()
    const {id} = event.pathParameters
    let result, statusCode

    try {
      const Item = await dynamodb.get({
        TableName: 'TodoTable',
        Key: {id},
      }).promise()
     result = {
      Operation: "FETCH Item",
      Message: "SUCCESS",
      Item: Item.Item,
     }
     statusCode = 200
    }
    catch(e){
      console.log(e)
      result = {
        Operation: "FETCH Item",
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