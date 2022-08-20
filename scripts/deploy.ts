import { ethers } from "hardhat";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const BlueBird = await ethers.getContractFactory("BlueBird");

  const blueBirdStudio = await BlueBird.deploy(1000);
  const blueBirdFlat = await BlueBird.deploy(400);
  const blueBirdBungalow = await BlueBird.deploy(300);
  const blueBirdTerrace = await BlueBird.deploy(200);
  const blueBirdCondo = await BlueBird.deploy(100);
  const blueBirdMansion = await BlueBird.deploy(50);
  const blueBirdChateau = await BlueBird.deploy(10);
  const blueBirdPalace = await BlueBird.deploy(10);

  console.log("deployed contract - Studio:", blueBirdStudio.address);
  console.log("deployed contract - Flat:", blueBirdFlat.address);
  console.log("deployed contract - Bungalow:", blueBirdBungalow.address);
  console.log("deployed contract - Terrace:", blueBirdTerrace.address);
  console.log("deployed contract - Condo:", blueBirdCondo.address);
  console.log("deployed contract - Mansion:", blueBirdMansion.address);
  console.log("deployed contract - Chateau:", blueBirdChateau.address);
  console.log("deployed contract - Palace:", blueBirdPalace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });