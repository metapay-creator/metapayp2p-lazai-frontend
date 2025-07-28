// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MetaPayP2P {
    address public nationalWallet;
    address[] public users;
    address[] public companies;

    uint256 public INITIAL_NATIONAL_BALANCE = 50000;
    uint256 public AMOUNT_PER_USER = 500;
    uint256 public COLLECT_PERCENT = 10;

    mapping(address => uint256) public balances;

    constructor(
        address _nationalWallet,
        address[] memory _users,
        address[] memory _companies
    ) {
        require(_nationalWallet != msg.sender, "Your wallet must not be the national wallet");
        nationalWallet = _nationalWallet;
        users = _users;
        companies = _companies;
        balances[nationalWallet] = INITIAL_NATIONAL_BALANCE;
    }

    function distribute() public {
        require(balances[nationalWallet] >= AMOUNT_PER_USER * users.length, "Not enough national funds");
        for (uint i = 0; i < users.length; i++) {
            balances[users[i]] += AMOUNT_PER_USER;
            balances[nationalWallet] -= AMOUNT_PER_USER;
        }
    }

    function collect() public {
        for (uint i = 0; i < users.length; i++) {
            uint256 deduction = (balances[users[i]] * COLLECT_PERCENT) / 100;
            balances[users[i]] -= deduction;
            balances[nationalWallet] += deduction;
        }
        for (uint j = 0; j < companies.length; j++) {
            uint256 deduction = (balances[companies[j]] * COLLECT_PERCENT) / 100;
            balances[companies[j]] -= deduction;
            balances[nationalWallet] += deduction;
        }
    }

    function transfer(address to, uint256 amount) public {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        require(to != address(0), "Invalid recipient");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function resetAll() public {
        for (uint i = 0; i < users.length; i++) {
            balances[users[i]] = 0;
        }
        for (uint j = 0; j < companies.length; j++) {
            balances[companies[j]] = 0;
        }
        balances[nationalWallet] = INITIAL_NATIONAL_BALANCE;
    }

    function checkAllBalances() public view returns (uint256 national, uint256[] memory userBalances, uint256[] memory companyBalances) {
        userBalances = new uint256[](users.length);
        companyBalances = new uint256[](companies.length);
        for (uint i = 0; i < users.length; i++) {
            userBalances[i] = balances[users[i]];
        }
        for (uint j = 0; j < companies.length; j++) {
            companyBalances[j] = balances[companies[j]];
        }
        return (balances[nationalWallet], userBalances, companyBalances);
    }

    function getAllUsers() public view returns (address[] memory) {
        return users;
    }

    function getAllCompanies() public view returns (address[] memory) {
        return companies;
    }
}
