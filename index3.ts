const preço = parseFloat(prompt("Digite o preço normal:")!)
const codigo = parseInt(prompt("Digite o código:")!)

let preçoFinal = 0

if (codigo === 1) {
  document.write(`<p>O preço final é ${preço * 0.85}</p>`)
} else if (codigo === 2) {
  document.write(`<p>O preço final é ${preço * 0.9}</p>`)
} else if (codigo === 3) {
  preçoFinal = preço
  document.write(`<p>O preço final é ${preço}</p>`)
} else if (codigo === 4) {
  document.write(`<p>O preço final é ${preço * 1.03}</p>`)
} else {
  document.write(`<p>Código inválido</p>`)
}
