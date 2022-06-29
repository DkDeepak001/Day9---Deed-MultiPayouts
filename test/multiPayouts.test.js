const multiPayouts = artifacts.require('MultiPayouts');

contract('MultiPayouts', async (accounts) => {

	let MultiPayouts = null;

	before(async () =>{
		MultiPayouts = await multiPayouts.deployed();
	});


	//only owner can send
	it('should only onwer ', async () =>{
		const MultiPayoutsNew = await multiPayouts.new(accounts[0],accounts[1],10,{value:1000});
		try{
			await MultiPayoutsNew.Withdraw({from: accounts[2]});
		}
		catch(e){
			assert(e.message.includes("Only owner can send amount"));
			return;
		}
		assert(false);
	})
	//not too early
	it("not too early" , async () =>{
		const MultiPayoutsNew = await multiPayouts.new(accounts[0],accounts[1],10,{value:1000});

		try{
			await MultiPayoutsNew.Withdraw({from:accounts[1]})
		}

		catch(e){
			assert(e.message.includes('Too early'));
			return;
		}
		assert(false);
	})
	

	//able to withdraw payouts one by one 
	it('Withdraw payouts one by one', async () => {
		for(let i = 0; i <= 4; i++) {
		    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		    await new Promise(resolve => setTimeout(resolve, 1000));
		    await MultiPayouts.Withdraw({from: accounts[1]});
		    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		    assert(finalBalance.sub(initialBalance).toNumber() === -636280000000000);
    	}

	})

	//able to withdraw all pending payouts
	it('Withdraw payouts all in one', async () => {
		for(let i = 1; i <= 1; i++) {
		    const initialBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		    await new Promise(resolve => setTimeout(resolve, 1000));
		    await MultiPayouts.Withdraw({from: accounts[1]});
		    const finalBalance = web3.utils.toBN(await web3.eth.getBalance(accounts[1]));
		    assert(finalBalance.sub(initialBalance).toNumber() === -636280000000000);
    	}

	})
	

})