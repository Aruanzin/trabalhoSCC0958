const { v4: uuidv4 } = require('uuid');


async function main() {
  const contractAddress = "0x7746c83f50fa8533CB513cf77cD1F9B7DA7e2052";
  const TemperatureMonitor = await ethers.getContractFactory("TemperatureMonitor");
  const contract = TemperatureMonitor.attach(contractAddress);

  try {
      // Obter o número de temperaturas registradas
      const temperatureCount = await contract.getTemperatureCount();
      console.log(`Retorno da função getTemperatureCount: ${temperatureCount}`);

      if (temperatureCount === "0x") {
          console.error("A função getTemperatureCount retornou '0x', o que indica um problema.");
          return;
      }

      console.log(`Número de temperaturas registradas: ${temperatureCount}`);

      // Iterar sobre os registros e exibir a hash e o valor da temperatura
      for (let i = 0; i < temperatureCount; i++) {
        const [temperature, timestamp] = await contract.getTemperatureRecord(i);

        console.log(`Registro ${i + 1}:`);
        console.log(`  Temperatura: ${temperature}°C`);
        console.log(`  Timestamp: ${timestamp}`);
    }
  } catch (error) {
      console.error("Erro ao interagir com o contrato:", error);
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
      console.error(error);
      process.exit(1);
  });