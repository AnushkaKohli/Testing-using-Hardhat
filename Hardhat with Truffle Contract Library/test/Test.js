// Using web3.js library with truffle contract library

const Data = artifacts.require("Data");

contract("Data", (accounts) => {
    it("Should return the new data once it's changed", async() => {
        // const data = await Data.deployed(); // instance of the contract --> we are not doing this and instead doing the below because we are not deploying the contract and the constructor needs a string parameter
        const data = await Data.new("Hello World"); // instance of the contract
        assert.equal(await data.requestData(), "Hello World");   
        await data.setData("Hello Truffle");
        assert.equal(await data.requestData(), "Hello Truffle");
    });
});

// npm install --save-dev @nomiclabs/hardhat-truffle5 @nomiclabs/hardhat-web3 web3
// And add the following statement to your hardhat.config.js:
// require("@nomiclabs/hardhat-truffle5");