// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetaPayP2P {
    address public owner;
    address public nationalWallet;
    address[] public users;

    uint256 public INITIAL_NATIONAL_BALANCE = 50000;
    uint256 public AMOUNT_PER_USER = 500;
    uint256 public COLLECT_PERCENT = 10;

    mapping(address => uint256) public balances;

    constructor(address _nationalWallet, address[] memory _users) {
        require(_nationalWallet != msg.sender, "Your wallet must not be the national wallet");
        owner = msg.sender;
        nationalWallet = _nationalWallet;
        users = _users;
        balances[nationalWallet] = INITIAL_NATIONAL_BALANCE;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this");
        _;
    }

    function distribute() public onlyOwner {
        require(balances[nationalWallet] >= AMOUNT_PER_USER * users.length, "Not enough national funds");
        for (uint i = 0; i < users.length; i++) {
            balances[users[i]] += AMOUNT_PER_USER;
            balances[nationalWallet] -= AMOUNT_PER_USER;
        }
    }

    function collect() public onlyOwner {
        for (uint i = 0; i < users.length; i++) {
            uint256 amountToCollect = (balances[users[i]] * COLLECT_PERCENT) / 100;
            balances[users[i]] -= amountToCollect;
            balances[nationalWallet] += amountToCollect;
        }
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid recipient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function resetAll() public onlyOwner {
        for (uint i = 0; i < users.length; i++) {
            balances[users[i]] = 0;
        }
        balances[nationalWallet] = INITIAL_NATIONAL_BALANCE;
    }

    function checkAllBalances() public view returns (uint256 national, uint256[] memory userBalances) {
        uint256[] memory _userBalances = new uint256[](users.length);
        for (uint i = 0; i < users.length; i++) {
            _userBalances[i] = balances[users[i]];
        }
        return (balances[nationalWallet], _userBalances);
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }
}
