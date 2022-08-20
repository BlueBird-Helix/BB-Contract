const { artifacts, contract, } = require("hardhat");
const { use } = require("chai");

const BlueBird = artifacts.require("./BlueBird.sol");

use(require("chai-as-promised"))
  .should()

contract("BlueBird", ([dev, bob, carol, david, erin]) => {
  let bluebird;

  before(async () => {
    bluebird = await BlueBird.new(1000, { from: dev });
  });

  describe("Deployed Hall of royals", async () => {
    it("has an owner", async () => {
      let owner = await bluebird.owner();
      expect(owner).to.equal(dev)
    })

    it("has a name", async () => {
      let name = await bluebird.name()
      expect(name).to.equal("BlueBird Helix")
    })

    it("has a symbol", async () => {
      let symbol = await bluebird.symbol()
      expect(symbol).to.equal("BBH")
    })
  })

  describe("Transfers", async () => {
    it("transfer", async () => {
      await bluebird.mint();
      await bluebird.mint();

      await bluebird.transferFrom(dev, bob, 2);
      let owner = await bluebird.ownerOf(2);

      expect(owner).to.equal(bob);
    });

    it("has correct tokenURI", async () => {
      let tokenURI = await bluebird.tokenURI(1);
      expect(tokenURI).to.equal("ipfs://QmNXSQPSXkKcyfz1Hv5UfXdnEce8HbPmvRxX9QiKNgaigF/hidden.json")
    })

    it("checking ownership to the token", async () => {
      let owner = await bluebird.ownerOf(1)
      expect(owner).to.equal(dev)
    });

    it("reveal token image", async () => {
      await bluebird.reveal();
      let tokenURI = await bluebird.tokenURI(1);
      expect(tokenURI).to.equal("ipfs://QmfQYSR4gTxx7K4ctnfqEXDr3Hkbpd3btqkYrya5APWTvB/1.json")
    });
  })
});
