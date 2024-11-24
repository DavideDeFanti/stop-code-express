import express, { Request, Response, NextFunction } from 'express';
import dati from "./data";

const port = 3000;
const app = express();

app.set('view engine', 'hbs');
app.set("views", "./src/views");
app.use(express.static('public'));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log("LOG:", req.method, req.url);
    next();
})

app.get("/", (req: Request, res: Response) => {
    res.render("index", { pageTitle: "Express Shop", prodotti: dati });
})

app.get("/prodotto/:id", (req: Request, res: Response) => {
    const idNumber = parseInt(req.params.id);

    if (isNaN(idNumber)) {
        res.status(404).send("L'ID non è un numero");
        return;
    }

    const prodotto = dati.find((p) => p.id == idNumber);
    if (!prodotto) {
        res.status(404).send("Prodotto non trovato");
        return;
    }

    res.render("prodotto", { pageTitle: "Express Shop | Prodotto", prodotto: prodotto });
})

app.get("/api/prodotti", (req: Request, res: Response) => {
    res.json(dati);
})

app.get("/api/prodotto/:id", (req: Request, res: Response) => {
    const idNumber = parseInt(req.params.id);

    if (isNaN(idNumber)) {
        res.status(404).send("L'ID non è un numero");
        return;
    }

    const prodotto = dati.find((p) => p.id == idNumber);
    if (!prodotto) {
        res.status(404).send("Prodotto non trovato");
        return;
    }
    res.json(prodotto);
})

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).render("404.hbs");
})


app.listen(port, () => {
    console.log(`Server in esecuzione http://localhost:${port}`);
});