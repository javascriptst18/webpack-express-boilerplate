import '../scss/main.scss';

async function main() {
  const result = await Promise.resolve(`It's working!`);
  console.log(result);
}

main();
