const data = prompt("Digite uma data no formato dd/mm/aaaa")!

const [dia, mes, ano] = data.split("/")

const meses = [
  "janeiro",
  "fevereiro",
  "março",
  "abril",
  "maio",
  "junho",
  "julho",
  "agosto",
  "setembro",
  "outubro",
  "novembro",
  "dezembro"
]

document.write(`<p>${dia} de ${meses[Number(mes) - 1]} de ${ano}</p>`)
