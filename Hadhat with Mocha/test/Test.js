// Using mocha framework and web3.js library (web3.js library in pure form, without truffle)

const Data = artifacts.require("Data");

describe("Data", function() {
    let accounts;
    before(async() => {
        // this is how we get the accounts using web3.js library
        accounts = await web3.eth.getAccounts();
    });
    describe("Deployment", () => {
        it("Should return the new data once it's changed", async() => {
            const data = await Data.new("Hello World"); // instance of the contract
            assert.equal(await data.requestData(), "Hello World");   
            await data.setData("Hello Mocha");
            assert.equal(await data.requestData(), "Hello Mocha");
        });
    });
});

// npm install --save-dev @nomiclabs/hardhat-truffle5 @nomiclabs/hardhat-web3 web3
// And add the following statement to your hardhat.config.js:
// require("@nomiclabs/hardhat-truffle5");