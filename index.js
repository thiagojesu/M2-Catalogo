const express = require("express");

const path = require("path");
const app = express();

const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded());

const listafilmes = [
  {
    id: 1,
    nome: "Brilho Eterno de uma Mente Sem Lembranças",
    genero: "Drama",
    descricao:
      "Joel se surpreende ao saber que seu amor verdadeiro, Clementine, o apagou completamente de sua memória. Ele decide fazer o mesmo, mas muda de ideia. Preso dentro da própria mente enquanto os especialistas se mantêm ocupados em seu apartamento, Joel precisa avisá-los para parar.",
    imagem:
      "https://veja.abril.com.br/wp-content/uploads/2016/05/cinema-brilho-eterno-de-uma-mente-sem-lembrancas-jim-carrey-kate-winslet-20130808-01-original1.jpeg",
  },
  {
    id: 2,
    nome: "O profissional",
    genero: "Noir",
    descricao:
      "Mathilda tem apenas 12 anos de idade mas já conhece o lado obscuro da vida: seu pai abusivo guarda drogas para policiais corruptos e a mãe a negligencia. O vizinho Léon gosta de cuidar de plantas, mas é um assassino de aluguel para o gângster Tony. Quando sua família é assassinada por um agente antidrogas desonesto, Mathilda se une a um relutante Léon para aprender o negócio mortal e vingar a morte da família.",
    imagem:
      "https://cinegrandiose.files.wordpress.com/2014/10/leo-1.png?resize=960%2C540",
  },
  {
    id: 3,
    nome: "(500) Dias com Ela",
    genero: "Romance",
    descricao:
      "Um romântico escritor se surpreende quando sua namorada Summer termina o namoro repentinamente. Com isso, ele relembra vários momentos dos 500 dias que passaram juntos para tentar descobrir onde seu caso de amor se perdeu e vai redescobrindo suas verdadeiras paixões.",
    imagem:
      "https://cdn.ome.lt/tqJ-eDjI6smqMeWogab4pPcySvA=/1200x630/smart/extras/conteudos/500-dias-com-ela.jpg",
  },
];

let filmes = undefined;

app.get("/", (req, res) => {
  res.render("index", { listafilmes, filmes });
});

app.post("/create", (req, res) => {
  const filmes = req.body;
  filmes.id = listafilmes.length + 1;
  listafilmes.push(filmes);
  res.redirect("/#cards");
});

app.get("/detalhes/:id", (req, res) => {
  const id = +req.params.id;
  filmes = listafilmes.find((filmes) => filmes.id == id);
  res.redirect("/#cadastro");
});

app.post("/update/:id", (req, res) => {
  const id = +req.params.id - 1;
  const novofilme = req.body;
  novofilme.id = id + 1;
  listafilmes[id] = novofilme;
  filmes = undefined;
  res.redirect("/");
});

app.get("/delete/:id", (req, res) => {
  const id = +req.params.id - 1;
  delete listafilmes[id];
  res.redirect("/#cards");
});

app.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`)
);
