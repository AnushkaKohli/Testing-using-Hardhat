const {expect} = require("chai");

describe("Token contract", function (){
    let Token;
    let hardhatToken;
    let owner;
    let addr1;
    let addr2;
    let addrs;

   beforeEach(async function(){
    Token = await ethers.getContractFactory("Token"); //instance of the contract factory
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners(); //getSigners() returns an array of signers
    hardhatToken = await Token.deploy(); //deploy the contract
   });

   describe("Deployment", function(){
    it("Should set the right owner", async() => {
        expect(await hardhatToken.owner()).to.equal(owner.address);
    });
    it("Should assign the total supply of tokens to the owner", async() => {
        const ownerBalance = await hardhatToken.balanceOf(owner.address);
        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);
    })
   });

   describe("Transaction", function(){
    it("Should transfer tokens between accounts", async() => {
        await hardhatToken.transfer(addr1.address, 10); // owner to addr1 10 tokens
        const addr1Balance = await hardhatToken.balanceOf(addr1.address);
        expect(addr1Balance).to.equal(10);

        await hardhatToken.connect(addr1).transfer(addr2.address, 5); // addr1 to addr2 5 tokens
        const addr2Balance = await hardhatToken.balanceOf(addr2.address);
        expect(addr2Balance).to.equal(5);
    });
    it("Should fail if sender does not have enough tokens", async() => {
        const initialOwnerBalance = await hardhatToken.balanceOf(owner.address);
        // reverted with must be the same line as the line reverted back by the require statement
        await expect(hardhatToken.connect(addr1).transfer(owner, 10)).to.be.revertedWith("Not enough tokens");
        expect(await hardhatToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    })
   })
});











