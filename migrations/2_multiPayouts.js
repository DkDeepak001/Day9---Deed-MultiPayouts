const MultiPayouts = artifacts.require("./MultiPayouts.sol");

module.exports = function(deployer, _network, accounts) {
  deployer.deploy(MultiPayouts, accounts[0], accounts[1], 1 , {value:1000});
};
