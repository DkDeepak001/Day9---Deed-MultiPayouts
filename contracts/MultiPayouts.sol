// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MultiPayouts{

	address public sender;
	address payable public  reciver;
	uint public DeployTime;
	uint public duePayouts;
	uint public amount;
	uint constant public PAYOUTS = 10;
	uint constant public INTERVAL = 10;
	uint public paidPayouts;

	constructor (address _sender, address payable _reciver, uint _time) payable public{

		sender = _sender;
		reciver = _reciver;
		DeployTime = block.timestamp + _time;
		amount = msg.value / PAYOUTS ;
	}


	//to withdraw
	function Withdraw() public payable{
		require(msg.sender == reciver , 'Only owner can send amount');
		require(block.timestamp > DeployTime, 'Too early');
		require(paidPayouts < PAYOUTS, 'No payouts left');
		uint eligiblePayouts = (block.timestamp - DeployTime) / INTERVAL;
		duePayouts = eligiblePayouts - paidPayouts;
		duePayouts = duePayouts + paidPayouts > PAYOUTS ? PAYOUTS - paidPayouts : duePayouts;
		paidPayouts += duePayouts;


		reciver.transfer(duePayouts * amount);
	}

}