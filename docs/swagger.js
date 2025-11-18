import swaggerJSDoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "2KW PREDICT",
      version: "1.0.0",
      description: "API Documentation for 2KW PREDICT",
      contact: {
        name: "Lewiston001",
        email: "lewisemmanuelisang17@gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development port",
      },
      {
        url: "https://twokw-backend.onrender.com",
        description: "Production",
      },
    ],
  },
  // Path to the API docs
  apis: ["./routes/*.js"], // files containing annotations for the OpenAPI Specification
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
