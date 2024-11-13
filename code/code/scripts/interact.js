const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

async function main() {
    const contractAddress = "0x7746c83f50fa8533CB513cf77cD1F9B7DA7e2052";
    const TemperatureMonitor = await ethers.getContractFactory("TemperatureMonitor");
    const contract = TemperatureMonitor.attach(contractAddress);

    // Ler o arquivo JSON
    const data = fs.readFileSync('../../projeto/dados/temperaturas.json', 'utf8');
    const temperatures = JSON.parse(data);

    // Iterar sobre os dados e registrar cada temperatura
    for (const entry of temperatures) {
        //if(entry.temperatura > 20){
            const temperature = parseInt(entry.temperatura);
            const timetemp = new Date(entry.timestamp);
            const timestampInSeconds = Math.floor(timetemp.getTime() / 1000);
            await contract.registerTemperature(temperature, timestampInSeconds);
            console.log(`Registrada temperatura ${temperature} em ${entry.timestamp} ou ${timestampInSeconds}`);
        //}
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });