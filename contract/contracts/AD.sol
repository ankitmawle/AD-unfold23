// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/456f69f1912fac93f21845f71df42128d6b755f6/src/interfaces/IWormholeReceiver.sol";

contract AD is IWormholeReceiver{
    uint private fees;
    address private wormholeRelayer;
    address private owner;
    address private admin; 
    address private voyagerAddress;
    struct userData {
        address userAddress;
        bytes32 username;
        bytes32 name;
    }
    
    uint256 withdrawalFees;
    uint256 registerFees;
    mapping(bytes32 => userData) private userNameDetail ;
    mapping(address => bytes32) private userName;
    mapping(bytes32 => uint256) private userBalance ;

    event transactionSent(bytes32 _sender, bytes32 _receiver ,uint256 _amount);

    // modifier to check if caller is owner
    modifier isOwnerOrAdmin() {
        require(msg.sender == owner||  msg.sender== admin , "Caller is not owner");
        _;
    }

    // modifier to check if caller is registered with us
    modifier isRegistered() {
         require(userName[msg.sender] > 0 , "Please register before sending money");
        _;
    }

    constructor(address _admin, address _wormholeRelayer) {
        owner= msg.sender;
        admin= _admin;
        fees=0;
        withdrawalFees=0;
        registerFees=0;
        wormholeRelayer=_wormholeRelayer;
    }

    function changeAdmin(address _newAdmin) external isOwnerOrAdmin{
        admin= _newAdmin;   
    }

    function getAdmin() public view  returns(address) {
        return admin;
    }

    function register(bytes32 _username, bytes32 _name) public payable {
        //fees per registration = registerFees 
        require(msg.value >= registerFees, 'need to pay fees to register');
        require(userNameDetail[_username].userAddress == address(0),'Already registered username');
        fees= fees+ msg.value;
        userNameDetail[_username]= userData({
                                        userAddress:msg.sender, 
                                        username:_username,
                                        name:_name});
        userName[msg.sender]= _username;
        userBalance[_username]= 0;
    }


    mapping(bytes32 => bool) public seenDeliveryVaaHashes;

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additionalVaas
        bytes32, // address that called 'sendPayloadToEvm' 
        uint16 sourceChain,
        bytes32 deliveryHash // this can be stored in a mapping deliveryHash => bool to prevent duplicate deliveries
    ) public payable  {
        require(msg.sender == address(wormholeRelayer), "Only relayer allowed");

        // Ensure no duplicate deliveries
        require(!seenDeliveryVaaHashes[deliveryHash], "Message already processed");
        seenDeliveryVaaHashes[deliveryHash] = true;

        // Parse the payload and do the corresponding actions!
        (bytes32 _username, bytes32 _name, address sender) = abi.decode(payload, (bytes32, bytes32, address));
        require(userNameDetail[_username].userAddress == address(0),'Already registered username');
        fees= fees+ msg.value;
        userNameDetail[_username]= userData({
                                        userAddress:sender, 
                                        username:_username,
                                        name:_name});
        userName[sender]= _username;
        userBalance[_username]= 0;
    }

    function handleVoyagerMessage(
        address tokenSent,
        uint256 amount,
        bytes memory message
    ) external{
        address sender;
        bytes32 receiver;
        uint256 _amount;
        (sender, receiver, _amount) = abi.decode(message, (address, bytes32, uint256));
        userBalance[receiver]+=amount;
        bytes32 senderUsername= userName[sender];
        emit transactionSent(senderUsername, receiver, amount);
       
    }

    function sendMoney(bytes32 _username, uint256 _amount) public payable isRegistered{
        //fees per transaction= 0 for avax sendfees for other chains
        require(msg.value>=_amount,'Amount sent less than required');
        require(userNameDetail[_username].userAddress != address(0), 'invalid username');
        userBalance[_username]+=_amount;
        bytes32 senderUsername= userName[msg.sender];
        emit transactionSent(senderUsername, _username, _amount);
       }
    

    function withdrawMoney(uint256 _amount) public {
        //Withdrawl fees per transaction= withdrawalFees
        require(userBalance[userName[msg.sender]] > _amount + withdrawalFees); 
        userBalance[userName[msg.sender]]=userBalance[userName[msg.sender]]-_amount-withdrawalFees;
        fees+=withdrawalFees;
        (bool sent, bytes memory data) = msg.sender.call{value: _amount}("");
        
        require(sent, "Failed to send Ether");
    }

    function withdrawFees() public isOwnerOrAdmin(){
        (bool sent, bytes memory data) = msg.sender.call{value: fees}("");
        fees=0;
        require(sent, "Failed to send Ether");
    }

    function getUserDetails(bytes32 _username) public view returns(bytes32){
        return userNameDetail[_username].name;
    }

    function getUserAddress( bytes32 _username) public view returns(address){
        return userNameDetail[_username].userAddress;
    }

    function getMyBalance(bytes32 _userName) public view returns(uint256){
        return userBalance[_userName];
    }

    function viewFeeBalance() public isOwnerOrAdmin returns(uint256){
        return fees;
    } 

    function getUserName(address _sender) public view returns( bytes32){
        return userName[_sender];
    }
    
    function getWithdrawalFees() public view returns( uint256){
        return withdrawalFees;
    }
    
    function getRegisterFees() public view returns( uint256){
        return registerFees;
    }
    
    function setRegisterFees(uint256 _registerFees)   public isOwnerOrAdmin(){
        registerFees = _registerFees;
    }

    function setwithdrawalFees(uint256 _withdrawalFees)   public isOwnerOrAdmin(){
        withdrawalFees=_withdrawalFees;
    }





}