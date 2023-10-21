// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/456f69f1912fac93f21845f71df42128d6b755f6/src/interfaces/IWormholeRelayer.sol";
import "https://github.com/wormhole-foundation/wormhole-solidity-sdk/blob/456f69f1912fac93f21845f71df42128d6b755f6/src/interfaces/IWormholeReceiver.sol";



contract crossAD is IWormholeReceiver{
    bytes4 public constant I_DEPOSIT_MESSAGE_SELECTOR = bytes4(keccak256("iDepositMessage(uint256,bytes32,bytes,address,uint256,uint256,bytes)"));

    uint private fees;
    uint256 constant GAS_LIMIT = 50_000;
    address private owner;
    address private admin; 
    address private wormholeAddress;
    address private avaxAddress;
    address private voyagerAddress;

    struct userData {
        address userAddress;
        bytes32 username;
        bytes32 name;
    }
    uint16 private baseChainId ;
    uint256 registerFees;
    uint256 crossTransferFees;

    event transactionSent(bytes32 _sender, bytes32 _receiver ,uint256 _amount);

    
    IWormholeRelayer public immutable wormholeRelayer;

    // modifier to check if caller is owner
    modifier isOwnerOrAdmin() {
        require(msg.sender == owner||  msg.sender== admin , "Caller is not owner");
        _;
    }



    constructor(address _admin, address _wormholeAddress, address _avaxAddress) {
        owner= msg.sender;
        admin= _admin;
        fees=0;
        registerFees=0;
        wormholeAddress=_wormholeAddress;
        avaxAddress=_avaxAddress;
        baseChainId= 6;
        wormholeRelayer = IWormholeRelayer(_wormholeAddress);
        crossTransferFees=0;
    }

    function changeAdmin(address _newAdmin) external isOwnerOrAdmin{
        admin= _newAdmin;   
    }

    function getAdmin() public view  returns(address) {
        return admin;
    }


    function registerExternal(bytes32 _username, bytes32 _name) public payable {
        //fees per registration = registerFees 
        require(msg.value >= registerFees, 'need to pay fees to register');
        fees= fees+ msg.value;
        
        bytes memory payload = abi.encode(_username, _name, msg.sender);

        uint256 cost;
        (cost,) = wormholeRelayer.quoteEVMDeliveryPrice(baseChainId, 0, GAS_LIMIT);
	    require(msg.value >= cost, "Please try later");
        wormholeRelayer.sendPayloadToEvm{value: cost}(
            baseChainId,
            avaxAddress,
            payload,
            0, // no receiver value needed
            GAS_LIMIT
        );

    }

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory, // additionalVaas
        bytes32, // address that called 'sendPayloadToEvm' (HelloWormhole contract address)
        uint16 sourceChain,
        bytes32 deliveryHash // this can be stored in a mapping deliveryHash => bool to prevent duplicate deliveries
    ) public payable override {
        require(msg.sender == address(wormholeRelayer), "Only relayer allowed");

        // Parse the payload and do the corresponding actions!
        (string memory greeting, address sender) = abi.decode(payload, (string, address));
        }

    
    function withdrawFees() public isOwnerOrAdmin(){
        (bool sent, bytes memory data) = msg.sender.call{value: fees}("");
        fees=0;
        require(sent, "Failed to send Ether");
    }

   
    function viewFeeBalance() public isOwnerOrAdmin returns(uint256){
        return fees;
    }   
 
    
    function getRegisterFees() public view returns( uint256){
        return registerFees;
    }
    
    function setRegisterFees(uint256 _registerFees)   public isOwnerOrAdmin(){
        registerFees = _registerFees;
    }



  
}