const {expect} = require("chai");

describe("Token contract", function (){
    it("Deployment should assign the total supply of tokens to the owner", 
    async function (){
        const [owner] = await ethers.getSigners(); //getSigners() returns an array of signers
        const Token = await ethers.getContractFactory("Token"); //instance of the contract factory

        const hardhatToken = await Token.deploy(); //deploy the contract

        const ownerBalance = await hardhatToken.balanceOf(owner.address);

        // mocha framework also provides assert but expect inside chai library is more popular
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance); // chai's syntax to check if the total supply is equal to the owner's balance
    });
    it("Should transfer tokens between accounts", async function() {
        const [owner, addr1, addr2] = await ethers.getSigners();
        const Token = await ethers.getContractFactory("Token");
        const hardhatToken = await Token.deploy();

        // sending 10 tokens from owners account to addr1. no need to specify it is sent from owners account because hardhat automatically recognises it
        await hardhatToken.transfer(addr1, 10);
        expect(await hardhatToken.balanceOf(addr1.address)).to.equal(10);

        // sending 5 tokens from addr1 account to addr2 account
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardhatToken.balanceOf(addr2.address)).to.equal(5);
    });
});