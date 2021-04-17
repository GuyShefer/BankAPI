const app = require('./server');
const port = 8000;

app.listen(port,()=>{
    console.log(`application start at ${port}`);
})
