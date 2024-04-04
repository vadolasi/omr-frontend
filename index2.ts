const n = parseInt(prompt("Digite um número: ")!)

let soma = 0

for (let i = 1; i < n; i++) {
  if (n % i === 0) {
    soma += i
  }
}

document.write(`<p>A soma dos divisores de ${n} é ${soma}</p>`)
