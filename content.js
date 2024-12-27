const data = [];
let i = 0;

// Todos os itens
const allItems = document.querySelectorAll("[style='max-width: 381px; min-width: 242px;']");
// Último item da lista
const lastItem = allItems.length;

nextItem();

function nextItem() {
  if (i < lastItem) {
    // Seleciona o item atual da lista
    const listItem = allItems[i];

    // Barra de rolagem acompanha o loop pelos itens
    listItem.scrollIntoView();

    try {
      // Link da imagem
      const img = listItem.querySelector("img")?.src || "Não encontrado";

      // Link do anúncio
      const URL = listItem.querySelector("a")?.href || "Não encontrado";

      // Preço
      const price = listItem.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[0].textContent || "Não encontrado";

      // Título
      const title = listItem.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[1].innerText  || "Não encontrado";

      // Cidade
      const city = listItem.children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[0].children[1].children[2].innerText  || "Não encontrado";

      // Adiciona como uma linha ao array de dados
      data.push([i,'=image("'+img+'";1)',img, URL, price, title, city]);
    } catch (error) {
      console.error(`Erro ao processar o item ${i}:`, error);

      // Adiciona valores padrão no caso de erro
      data.push(["Erro ao obter imagem", "Erro ao obter URL", "Erro ao obter preço", "Erro ao obter título", "Erro ao obter cidade"]);
    }

    // Incrementa o índice e chama a próxima iteração
    i++;
    setTimeout(nextItem,50) // Adiciona um pequeno delay para evitar sobrecarga
  } else {
    console.log(data);
    salvarComoTxt(data);
  }
}

// Função para criar e salvar o arquivo .txt
function salvarComoTxt(dados) {
  // Converte os dados em texto com separadores de tabulação (\t) e nova linha (\n)
  const cabecalho = "Index\tImagem\tLink da imagem\tAnúncio\tPreço\tTítulo\tCidade\n";
  const texto = cabecalho + dados.map(linha => linha.join("\t")).join("\n");

  // Cria o Blob com o texto
  const blob = new Blob([texto], { type: "text/plain" });

  // Cria o link para download
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dados_sites.txt"; // Nome do arquivo
  link.click();

  // Libera a URL do Blob após o download
  URL.revokeObjectURL(url);
}