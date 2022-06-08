const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/routesCourses.js','./routes/routesLessons.js']


swaggerAutogen(outputFile, endpointsFiles)