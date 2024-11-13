const { ethers } = require("hardhat");

async function main() {
  const TemperatureMonitor = await ethers.getContractFactory("TemperatureMonitor");
  const temperatureMonitor = await TemperatureMonitor.deploy();
  // const temperature = await TemperatureMonitor.waitForDeployment()
//   await temperatureMonitor.deployed();

  console.log("TemperatureMonitor deployed to:", temperatureMonitor.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });