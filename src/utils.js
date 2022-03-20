
function build_response(statusCode, body) {
    return {
      statusCode: statusCode,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  }
  
module.exports = {
  build_response: build_response
} 