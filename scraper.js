if (!window.hasRun) {
    window.hasRun = true; // Evita múltiplas execuções
  
    let data = JSON.parse(localStorage.getItem("scrapedData")) || [];
    let i = 0;
  
    function nextItem() {
      const allItems = document.querySelectorAll("[id='results']")[0]?.parentElement?.parentElement?.children[6]?.children;
  
      if (!allItems || allItems.length === 0) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
        setTimeout(nextItem, 4000);
        return;
      }
  
      if (i < allItems.length) {
        const itemList = allItems[i];
        itemList.scrollIntoView({ behavior: "smooth" });
  
        try {
          let img = "Não encontrado";
          if (itemList.children[0]?.children[0]?.children[0]?.children[2]?.src) {
            img = itemList.children[0].children[0].children[0].children[2].src;
          } else if (itemList.children[0]?.children[0]?.children[0]?.children[1]?.src) {
            img = itemList.children[0].children[0].children[0].children[1].src;
          }
  
          const title = itemList.children[0]?.children[0]?.children[1]?.children[0]?.textContent?.trim() || "Não encontrado";
          let price = "Não encontrado";
  
          if (itemList.children[0]?.children[0]?.children[1]?.children[1]?.className.includes("price")) {
            price = itemList.children[0]?.children[0]?.children[1]?.children[1]?.children[0]?.textContent;
          } else if (itemList.children[0]?.children[0]?.children[1]?.children[2]?.className.includes("price")) {
            price = itemList.children[0]?.children[0]?.children[1]?.children[2]?.children[0]?.textContent;
          } else if (itemList.children[0]?.children[0]?.children[1]?.children[3]?.className.includes("price")) {
            price = itemList.children[0]?.children[0]?.children[1]?.children[3]?.children[0]?.textContent;
          }
  
          const URL = itemList.children[0]?.children[0]?.children[1]?.children[0]?.children[0]?.href || "Não encontrado";
  
          data.push(['=image("' + img + '";1)', title, price, URL, img]);
        } catch (error) {
          console.error(`Erro ao processar o item ${i}:`, error);
          data.push(["Erro ao obter imagem", "Erro ao obter título", "Erro ao obter preço", "Erro ao obter link"]);
        }
  
        i++;
        localStorage.setItem("scrapedData", JSON.stringify(data));
        localStorage.setItem("currentIndex", i);
        setTimeout(nextItem, 200);
      } else {
        nextPage();
      }
    }
  
    function nextPage() {
      var pageList = document.querySelector("[aria-label='Paginação']").children[0].children;
  
      if (pageList && pageList.length > 0) {
        var indexButton = Array.from(pageList).findIndex(button => button.children[0].getAttribute("aria-current") === "page");
  
        if (indexButton >= 0 && indexButton + 2 < pageList.length) {
          pageList[indexButton + 1].children[0].click();
        } else {
          salvarComoTxt(data);
        }
      } else {
        salvarComoTxt(data);
      }
    }
  
    function salvarComoTxt(dados) {
      const cabecalho = "Imagem\tTítulo\tPreço\tAnúncio\tLink da imagem\n";
      const texto = cabecalho + dados.map(linha => linha.join("\t")).join("\n");
  
      const blob = new Blob([texto], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "dados_sites.txt";
      link.click();
  
      URL.revokeObjectURL(url);
      localStorage.removeItem("scrapedData");
      localStorage.removeItem("currentIndex");
    }
  
    setTimeout(nextItem,5000);
  }
  