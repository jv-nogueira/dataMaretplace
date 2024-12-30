const data = [];
let i = 0;

nextItem();

function nextItem() {
    // Todos os itens
    const allItems = document.querySelectorAll("[style='max-width: 381px; min-width: 242px;']");
    // Último item da lista
    const lastItem = allItems.length;
    if(lastItem == 0){
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        setTimeout(nextItem,4000) 
        console.log("O lastItem é "+lastItem)
    }else if (i < lastItem && allItems[i].parentElement.parentElement.textContent.contains("Resultados de fora da tua pesquisa") == false) {

        // Seleciona o item atual da lista
        const listItem = allItems[i];

        // Barra de rolagem acompanha o loop pelos itens
        allItems[i].scrollIntoView({ behavior: "smooth" });
        
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
        data.push([i+1,'=image("'+img+'";1)', title, price, city, URL,img]);
      } catch (error) {
        console.error(`Erro ao processar o item ${i}:`, error);

        // Adiciona valores padrão no caso de erro
        data.push(["Erro ao obter imagem", "Erro ao obter URL", "Erro ao obter preço", "Erro ao obter título", "Erro ao obter cidade"]);
      }

      // Incrementa o índice e chama a próxima iteração
      i++;
      if(i <= lastItem-8){
          setTimeout(nextItem,100) // Pequeno delay para evitar sobrecarga
      } else {
          setTimeout(nextItem,2000) // Delay maior para aguardar o carregamento do próximo item
      }
    } else {
    console.log(data);
    salvarComoTxt(data);
    }
}

// Função para criar e salvar o arquivo .txt
function salvarComoTxt(dados) {
  // Converte os dados em texto com separadores de tabulação (\t) e nova linha (\n)
  const cabecalho = "Index\tImagem\tTítulo\tPreço\tCidade\tAnúncio\tLink da imagem\n";
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