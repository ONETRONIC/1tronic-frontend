pragma solidity >=0.5.0;
// SPDX-License-Identifier: GPL-3.0-or-later

// Aseli poenya OneTronicSwap Indonesia Poenya Rasa import
// Mau punya juga?
// Call our dev team
interface IOneTronicCallee {
    function OneTronicCall(address sender, uint amount0, uint amount1, bytes calldata data) external;
}