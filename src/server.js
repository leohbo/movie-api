require("express-async-errors")

const AppError = require("./utils/AppError")

const express = require('express')

const routes = require("./routes")

const app = express()

app.use(express.json())

app.use(routes);

app.use((error, request, response, next) => {
if(error instanceof AppError) {
return response.status(error.statusCode).json({ //erro do cliente
    status:"error",
    message: error.message
});

}

console.error(error);

return response.status.status(500).json({
     status:"error",
     message:"Internal Server Error" //erro do servidor

  });
});



const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on Port ${PORT}`)); // como se fosse o endereço

