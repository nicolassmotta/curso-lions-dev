// Promise com await/async (sem resolve/reject explícito)

async function esperar(ms) {
  // Promise criada direto para simular o tempo de espera
  await new Promise((ok) => setTimeout(ok, ms));
}

async function exemploAsync() {
  console.log('Antes de esperar');

  await esperar(2000);

  console.log('Depois de esperar');
}

exemploAsync();
