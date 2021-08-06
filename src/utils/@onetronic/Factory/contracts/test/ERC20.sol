pragma solidity >=0.5.16;

import '../OneTronicERC20.sol';
// SPDX-License-Identifier: GPL-3.0-or-later

contract ERC20 is OneTronicERC20 {
    constructor(uint _totalSupply) public {
        _mint(msg.sender, _totalSupply);
    }
}