const data = [];
let i = 0;

nextItem();

function nextItem() {
    // Todos os itens
    const allItems = document.querySelectorAll("[id='results']")[0]?.parentElement?.parentElement?.children[6]?.children;
    
    if (!allItems || allItems.length === 0) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        setTimeout(nextItem, 4000);
        console.log("Nenhum item encontrado");
        return;
    }
    
    if (i < allItems.length) {
        // Seleciona o item atual da lista
        const itemList = allItems[i];
        itemList.scrollIntoView({ behavior: "smooth" });
        
        try {
            // Imagem do item
            let img = "Não encontrado"; // Valor padrão
            if (itemList.children[0]?.children[0]?.children[0]?.children[2]?.src) {
                img = itemList.children[0].children[0].children[0].children[2].src;
            } else if (itemList.children[0]?.children[0]?.children[0]?.children[1]?.src) {
                img = itemList.children[0].children[0].children[0].children[1].src;
            }
            
            // Título do item
            const title = itemList.children[0]?.children[0]?.children[1]?.children[0]?.textContent?.trim() || "Não encontrado";
            
            // Preço do item
            let price = "Não encontrado";
            if(itemList.children[0]?.children[0]?.children[1]?.children[1]?.className.includes("price")){
                price = itemList.children[0]?.children[0]?.children[1]?.children[1]?.children[0]?.textContent
            }else if(itemList.children[0]?.children[0]?.children[1]?.children[2]?.className.includes("price")){
                price = itemList.children[0]?.children[0]?.children[1]?.children[2]?.children[0]?.textContent
            }else if(itemList.children[0]?.children[0]?.children[1]?.children[3]?.className.includes("price")){
                price = itemList.children[0]?.children[0]?.children[1]?.children[3]?.children[0]?.textContent
            }
            
            // Link do anúncio
            const URL = itemList.children[0]?.children[0]?.children[1]?.children[0]?.children[0]?.href || "Não encontrado";
            
            // Adiciona como uma linha ao array de dados
            data.push([i + 1, '=image("' + img + '";1)', title, price, URL, img]);
        } catch (error) {
            console.error(`Erro ao processar o item ${i}:`, error);
            data.push([i + 1, "Erro ao obter imagem", "Erro ao obter título", "Erro ao obter preço", "Erro ao obter link"]);
        }
        
        // Incrementa o índice e chama a próxima iteração
        i++;
        setTimeout(nextItem, 200);
    } else {
        console.log(data);
        salvarComoTxt(data);
    }
}

// Função para criar e salvar o arquivo .txt
function salvarComoTxt(dados) {
    const cabecalho = "Index\tImagem\tTítulo\tPreço\tAnúncio\tLink da imagem\n";
    const texto = cabecalho + dados.map(linha => linha.join("\t")).join("\n");
    
    const blob = new Blob([texto], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dados_sites.txt";
    link.click();
    
    URL.revokeObjectURL(url);
}
