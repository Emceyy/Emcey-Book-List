const express = require('express');
const app = express();
const PORT = 3636;
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas/index');
const cors = require("cors");

app.use(cors());//client ve server farklı portlarda çalışıyor, beraber çalışabilmeleri için gerekli.
app.use(express.json());//gelen json isteğini okuyabilmek için dahil etmek zorundayız!

app.use("/graphql", graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(PORT, () => {
    console.log(`server running ${PORT}`);
});